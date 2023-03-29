<<<<<<< HEAD
import { TopBaselineDeviation, TimelineElement, CombinedDeviation, BaselineDeviation, Baseline, BaselinePostureCountsByDate } from "../public-api";
import { User } from "@microsoft/microsoft-graph-types-beta";

export function groupBy(arr: Array<any>, key: string) {
    return arr.reduce((acc, obj) => {
        const _key = obj[key];
        if (!acc.hasOwnProperty(_key)) {
            acc[_key] = [];
        }

        acc[_key].push(obj);
        return acc;
    }, {});
}

export function filterTopBaselines(baselines: any[]): TopBaselineDeviation[] {
    return baselines
        .filter(b => !!b['deviation_resolve_time'] ? b['deviation_resolve_time'] < b['deviation_detect_time'] : true)
        .filter((b, i, arr) => arr.findIndex(el => el.name === b.name && el.category === b.category) === i)
        .sort((a, b) => b.deviation_detect_time.localeCompare(a.deviation_detect_time))
        .map(b => ({
            severity: 'warning',
            timestamp: b.deviation_detect_time as string,
            category: b.category as string,
            name: b.name as string
        }));
}

export function GetPostureControlsInThisPeriod(baseline_deviations: CombinedDeviation[], baselines: Baseline[], type: 'tenant' | 'group', start: string, end: string): BaselinePostureCountsByDate {
    const init_created_timestamp = '2022-09-27';
    let formatted: { [date: string]: { deviating: number, compliant: number | null, monitored: number | null } } = {};
    const dateArray = getDates(start, end);
    console.log('dateArray',dateArray);
    for (var date of dateArray) {
        const existing_baselines: Baseline[] = baselines.filter(b => b.type === type && b.created.split('T')[0] <= date);
        const deviations_controls_of_the_date: CombinedDeviation[] = getBaselineDeviationsCountOfTheDate(baseline_deviations, type, date);
        const compliance_controls_of_the_date_count: number | null =
            date >= init_created_timestamp ?
                getBaselineComplianceCountOfTheDate(deviations_controls_of_the_date, existing_baselines, type, date) : null;
        const monitored_control_of_the_date_count: number | null =
            date >= init_created_timestamp ?
                existing_baselines.length : null;

        formatted[date] = {
            deviating: deviations_controls_of_the_date.length,
            compliant: compliance_controls_of_the_date_count,
            monitored: monitored_control_of_the_date_count
        };
    }
    return formatted;
}

function getBaselineDeviationsCountOfTheDate(baseline_deviations: CombinedDeviation[], type: 'tenant' | 'group', date: any) {
    let deviating_baselines = baseline_deviations
        .filter(bd => bd.type === type && bd.deviation_detect_time.split('T')[0] <= date &&
            (bd.deviation_resolve_time === null || bd.deviation_resolve_time.split('T')[0] > date))
        .sort((a, b) => b.deviation_detect_time.localeCompare(a.deviation_detect_time))

    deviating_baselines = deviating_baselines.filter((value, index, self) => {
        return self.findIndex(v => v.baseline_id === value.baseline_id) === index;
    })
    return deviating_baselines;
}

function getBaselineComplianceCountOfTheDate(deviating_baselines: CombinedDeviation[], baselines: Baseline[], type: 'tenant' | 'group', date: any) {
    let compliance_count = 0;
    if (baselines.length > 0) {
        for (const existing_baseline of baselines) {
            const is_deviated = (deviating_baselines.some(d => d.baseline_id === existing_baseline.id));
            if (!is_deviated) {
                compliance_count++;
            }
        }
    }
    return compliance_count;
}

function getDates(startDate: string, endDate: string): string[] {
    var dateArray = new Array();
    var currentDate = startDate.split('T')[0];
    while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

function addDays(currentDate: string, days: number) {
    var date = new Date(currentDate.valueOf());
    date.setTime(date.getTime() + days * 24 * 3600 * 1000);
    return date.toISOString().split('T')[0];
}

export function GroupBaselineDeviationWithTimelineElementsByBaseline(array: CombinedDeviation[], users: User[]) {
    return array
        .reduce((transformed_array: BaselineDeviation[], curr: CombinedDeviation, index: number, arr: CombinedDeviation[]) => {

            let timelineElements: TimelineElement[] = [];
            let foundKeyIndex = getFoundKeyIndex(transformed_array, curr);
            let foundKeyTimeElements = foundKeyIndex !== -1 ? transformed_array[foundKeyIndex].timelineElements : [];

            let created_time = getBaselineCreatedTimestamp(foundKeyIndex, transformed_array, curr);
            if (!!created_time) {
                timelineElements.push(addTimeToBaselineTimeline(created_time, 'created'));
            }
            timelineElements.push(addTimeToBaselineTimeline(curr['deviation_detect_time'], 'deviation'));
            if (!!curr['deviation_resolve_time']) {
                timelineElements.push(addTimeToBaselineTimeline(curr['deviation_resolve_time'], 'remediated'));
            }

            if (foundKeyIndex !== -1) {
                transformed_array[foundKeyIndex].timelineElements = (transformed_array[foundKeyIndex].timelineElements
                    .concat(timelineElements))
                    .sort((a: any, b: any) => a.date.toISOString().localeCompare(b.date.toISOString()))
            } else {
                let transformed_item: BaselineDeviation = setTransformedItem(curr, foundKeyTimeElements, timelineElements, users);
                transformed_array.push(transformed_item)
            }
            return transformed_array
        }, [])
}

function getFoundKeyIndex(hash: BaselineDeviation[], curr: CombinedDeviation) {
    let foundKeyIndex = hash.findIndex((transformed_item: any) => transformed_item.baseline_id === curr.baseline_id);
    if (!!curr.group_name && !!curr.user_id) {
        foundKeyIndex = hash.findIndex((transformed_item: any) => transformed_item.baseline_id === curr.baseline_id &&
            transformed_item.group_name === curr.group_name && transformed_item.user_id === curr.user_id);
    }
    return foundKeyIndex;
}

/**
 * @param  {number} foundKeyIndex the target index of the grouped transformed_array array
 * @param  {any} tansformed the grouped tansformed array
 * @param  {any} curr the current element in the original array
 */
function getBaselineCreatedTimestamp(foundKeyIndex: number, transformed_array: BaselineDeviation[], curr: CombinedDeviation) {
    let created = undefined;
    if (foundKeyIndex === -1 || (foundKeyIndex !== -1 && !transformed_array[foundKeyIndex].timelineElements.find((el: TimelineElement) => el.status === 'created'))) {
        if (curr['baseline_created'] > curr['deviation_detect_time']) {
            // created = '2022-01-01T00:00:00.000Z';
            return created;
        }
        created = curr['baseline_created'];
    }
    return created;
}
/**
 * @param  {string} time - the timestamp in string which will be added as date in the timeline element
 * @param  {'created'|'deviation'|'remediated'} status what is the type that the timestamp referring to
 */
function addTimeToBaselineTimeline(time: string, status: 'created' | 'deviation' | 'remediated') {
    let timelineElement = {
        date: new Date(time),
        status
    };
    return timelineElement;
}
/**
 * @param  {CombinedDeviation} curr the current baseline deviation element in the original array
 * @param  {TimelineElement[]} existing_timeline_elements the existing timeline elements from transformed array
 * @param  {TimelineElement[]} new_timeline_elements the timeline elements to be added to the transformed array
 */
function setTransformedItem(curr: CombinedDeviation, existing_timeline_elements: TimelineElement[], new_timeline_elements: TimelineElement[], users: User[]): BaselineDeviation {
    let transformed_item: BaselineDeviation = {
        category: curr.category,
        type: curr.type,
        name: curr.name,
        baseline_id: curr.baseline_id,
        timelineElements: (existing_timeline_elements || [])
            .concat(new_timeline_elements)
            .sort((a: any, b: any) => a.date.toISOString().localeCompare(b.date.toISOString()))
    }

    if (curr.group_name && curr.user_id) {
        let user = users.find((u => u.id === curr.user_id))!;
        if (!user || !user.userPrincipalName) {
            transformed_item = updateTransformedItemForGroupUserBaseline(transformed_item, curr.group_name, curr.user_id, "User no longer exists");
        } else {
            transformed_item = updateTransformedItemForGroupUserBaseline(transformed_item, curr.group_name, curr.user_id, user.userPrincipalName!);
        }
    }
    return transformed_item;
}

function updateTransformedItemForGroupUserBaseline(transformed_item: BaselineDeviation, group_name: string, user_id: string, user_name: string): BaselineDeviation {
    return {
        ...transformed_item,
        group_name,
        user_id,
        user_name
    } as BaselineDeviation
=======
import { TopBaselineDeviation, TimelineElement, CombinedDeviation, BaselineDeviation, Baseline, BaselinePostureCountsByDate } from "../public-api";
import { User } from "@microsoft/microsoft-graph-types-beta";

export function groupBy(arr: Array<any>, key: string) {
    return arr.reduce((acc, obj) => {
        const _key = obj[key];
        if (!acc.hasOwnProperty(_key)) {
            acc[_key] = [];
        }

        acc[_key].push(obj);
        return acc;
    }, {});
}

export function filterTopBaselines(baselines: any[]): TopBaselineDeviation[] {
    return baselines
        .filter(b => !!b['deviation_resolve_time'] ? b['deviation_resolve_time'] < b['deviation_detect_time'] : true)
        .filter((b, i, arr) => arr.findIndex(el => el.name === b.name && el.category === b.category) === i)
        .sort((a, b) => b.deviation_detect_time.localeCompare(a.deviation_detect_time))
        .map(b => ({
            severity: 'warning',
            timestamp: b.deviation_detect_time as string,
            category: b.category as string,
            name: b.name as string
        }));
}

export function GetPostureControlsInThisPeriod(baseline_deviations: CombinedDeviation[], baselines: Baseline[], type: 'tenant' | 'group', start: string, end: string): BaselinePostureCountsByDate {
    const init_created_timestamp = '2022-09-27';
    let formatted: { [date: string]: { deviating: number, compliant: number | null, monitored: number | null } } = {};

    const dateArray = getDates(start, end);
    console.log('dateArray', dateArray);
    console.log('type', type);
    for (var date of dateArray) {
        console.log('date', date);
        const existing_baselines: Baseline[] = baselines.filter(b => b.type === type && b.created.split('T')[0] <= date);
        const deviations_controls_of_the_date: CombinedDeviation[] = getBaselineDeviationsCountOfTheDate(baseline_deviations, type, date);
        const compliance_controls_of_the_date_count: number | null =
            date >= init_created_timestamp ?
                getBaselineComplianceCountOfTheDate(deviations_controls_of_the_date, existing_baselines, type, date) : null;
        const monitored_control_of_the_date_count: number | null =
            date >= init_created_timestamp ?
                existing_baselines.length : null;

        formatted[date] = {
            deviating: deviations_controls_of_the_date.length,
            compliant: compliance_controls_of_the_date_count,
            monitored: monitored_control_of_the_date_count
        };
    }
    return formatted;
}

function getBaselineDeviationsCountOfTheDate(baseline_deviations: CombinedDeviation[], type: 'tenant' | 'group', date: any) {
    let deviating_baselines = baseline_deviations
        .filter(bd => bd.type === type && bd.deviation_detect_time.split('T')[0] <= date &&
            (bd.deviation_resolve_time === null || bd.deviation_resolve_time.split('T')[0] > date))
        .sort((a, b) => b.deviation_detect_time.localeCompare(a.deviation_detect_time))
    console.log('deviating_baselines', deviating_baselines);

    deviating_baselines = deviating_baselines.filter((value, index, self) => {
        return self.findIndex(v => v.baseline_id === value.baseline_id) === index;
    })
    return deviating_baselines;
}

function getBaselineComplianceCountOfTheDate(deviating_baselines: CombinedDeviation[], baselines: Baseline[], type: 'tenant' | 'group', date: any) {
    let compliance_count = 0;
    if (baselines.length > 0) {
        console.log('baselines', baselines);
        for (const existing_baseline of baselines) {
            const is_deviated = (deviating_baselines.some(d => d.baseline_id === existing_baseline.id));
            if (!is_deviated) {
                compliance_count++;
            }
        }
    }
    return compliance_count;
}

function getDates(startDate: string, endDate: string): string[] {
    var dateArray = new Array();
    var currentDate = startDate.split('T')[0];
    while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

function addDays(currentDate: string, days: number) {
    var date = new Date(currentDate.valueOf());
    date.setTime(date.getTime() + days * 24 * 3600 * 1000);
    return date.toISOString().split('T')[0];
}

export function GroupBaselineDeviationWithTimelineElementsByBaseline(array: CombinedDeviation[], users: User[]) {
    return array
        .reduce((transformed_array: BaselineDeviation[], curr: CombinedDeviation, index: number, arr: CombinedDeviation[]) => {

            let timelineElements: TimelineElement[] = [];
            let foundKeyIndex = getFoundKeyIndex(transformed_array, curr);
            let foundKeyTimeElements = foundKeyIndex !== -1 ? transformed_array[foundKeyIndex].timelineElements : [];

            let created_time = getBaselineCreatedTimestamp(foundKeyIndex, transformed_array, curr);
            if (!!created_time) {
                timelineElements.push(addTimeToBaselineTimeline(created_time, 'created'));
            }
            timelineElements.push(addTimeToBaselineTimeline(curr['deviation_detect_time'], 'deviation'));
            if (!!curr['deviation_resolve_time']) {
                timelineElements.push(addTimeToBaselineTimeline(curr['deviation_resolve_time'], 'remediated'));
            }

            if (foundKeyIndex !== -1) {
                transformed_array[foundKeyIndex].timelineElements = (transformed_array[foundKeyIndex].timelineElements
                    .concat(timelineElements))
                    .sort((a: any, b: any) => a.date.toISOString().localeCompare(b.date.toISOString()))
            } else {
                let transformed_item: BaselineDeviation = setTransformedItem(curr, foundKeyTimeElements, timelineElements, users);
                transformed_array.push(transformed_item)
            }
            return transformed_array
        }, [])
}

function getFoundKeyIndex(hash: BaselineDeviation[], curr: CombinedDeviation) {
    let foundKeyIndex = hash.findIndex((transformed_item: any) => transformed_item.baseline_id === curr.baseline_id);
    if (!!curr.group_name && !!curr.user_id) {
        foundKeyIndex = hash.findIndex((transformed_item: any) => transformed_item.baseline_id === curr.baseline_id &&
            transformed_item.group_name === curr.group_name && transformed_item.user_id === curr.user_id);
    }
    return foundKeyIndex;
}

/**
 * @param  {number} foundKeyIndex the target index of the grouped transformed_array array
 * @param  {any} tansformed the grouped tansformed array
 * @param  {any} curr the current element in the original array
 */
function getBaselineCreatedTimestamp(foundKeyIndex: number, transformed_array: BaselineDeviation[], curr: CombinedDeviation) {
    let created = undefined;
    if (foundKeyIndex === -1 || (foundKeyIndex !== -1 && !transformed_array[foundKeyIndex].timelineElements.find((el: TimelineElement) => el.status === 'created'))) {
        if (curr['baseline_created'] > curr['deviation_detect_time']) {
            // created = '2022-01-01T00:00:00.000Z';
            return created;
        }
        created = curr['baseline_created'];
    }
    return created;
}
/**
 * @param  {string} time - the timestamp in string which will be added as date in the timeline element
 * @param  {'created'|'deviation'|'remediated'} status what is the type that the timestamp referring to
 */
function addTimeToBaselineTimeline(time: string, status: 'created' | 'deviation' | 'remediated') {
    let timelineElement = {
        date: new Date(time),
        status
    };
    return timelineElement;
}
/**
 * @param  {CombinedDeviation} curr the current baseline deviation element in the original array
 * @param  {TimelineElement[]} existing_timeline_elements the existing timeline elements from transformed array
 * @param  {TimelineElement[]} new_timeline_elements the timeline elements to be added to the transformed array
 */
function setTransformedItem(curr: CombinedDeviation, existing_timeline_elements: TimelineElement[], new_timeline_elements: TimelineElement[], users: User[]): BaselineDeviation {
    let transformed_item: BaselineDeviation = {
        category: curr.category,
        type: curr.type,
        name: curr.name,
        baseline_id: curr.baseline_id,
        timelineElements: (existing_timeline_elements || [])
            .concat(new_timeline_elements)
            .sort((a: any, b: any) => a.date.toISOString().localeCompare(b.date.toISOString()))
    }

    if (curr.group_name && curr.user_id) {
        let user = users.find((u => u.id === curr.user_id))!;
        if (!user || !user.userPrincipalName) {
            console.log('ng-oct-report:: curr', curr);
            console.log('ng-oct-report:: users', users);
            transformed_item = updateTransformedItemForGroupUserBaseline(transformed_item, curr.group_name, curr.user_id, "User no longer exists");
        } else {
            transformed_item = updateTransformedItemForGroupUserBaseline(transformed_item, curr.group_name, curr.user_id, user.userPrincipalName!);
        }
    }
    return transformed_item;
}

function updateTransformedItemForGroupUserBaseline(transformed_item: BaselineDeviation, group_name: string, user_id: string, user_name: string): BaselineDeviation {
    return {
        ...transformed_item,
        group_name,
        user_id,
        user_name
    } as BaselineDeviation
>>>>>>> a9da6504b8944a106b1b3c4bf48041d81f94b611
}