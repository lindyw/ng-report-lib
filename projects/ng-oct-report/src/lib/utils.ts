import { TopBaselineDeviation, TimelineElement, CombinedDeviation, BaselineDeviation } from "../public-api";
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

export function GroupCompliancePostureByDayInThisPeriod(baseline_deviations: CombinedDeviation[], start: string, end: string) {
    let formatted: { [date: string]: { has_deviated: number, not_deviated: number } } = {};
    const dateArray = getDates(start, end);
    console.log('dateArray', dateArray);
    for (var date of dateArray) {
        const deviations_controls_of_the_date = getBaselineDeviationsCountOfTheDate(baseline_deviations, date);

        console.log(`baseline_deviations of ${date}`, deviations_controls_of_the_date);

        // TODO: get list of baselines with created timestamp
        const compliant_controls_of_the_date = {};
        const monitored_control_of_the_date = {};
        // const baseline_remediations_of_the_date = baseline_deviations
        //     .filter(bd =>
        //         !!bd.deviation_resolve_time &&
        //         bd.deviation_resolve_time?.split('T')[0] === date &&
        //         bd.deviation_resolve_time > bd.deviation_detect_time)

        formatted[date] = { has_deviated: deviations_controls_of_the_date.length, not_deviated: 0 };

        // for (var bd of baseline_deviations) {
        //     if (bd.deviation_detect_time.split('T')[0] === date) {
        //         if (bd.deviation_resolve_time === null) {
        //             formatted[date].has_deviated++;
        //         }
        //     }
        //     if (!!bd.deviation_resolve_time && bd.deviation_resolve_time.split('T')[0] === date) {

        //     }
        // }

    }
    return formatted;
}

function getBaselineDeviationsCountOfTheDate(baseline_deviations: CombinedDeviation[], date: any) {
    return baseline_deviations
        .filter(bd => bd.deviation_detect_time.split('T')[0] === date &&
            (bd.deviation_resolve_time === null || bd.deviation_resolve_time.split('T')[0] !== date)
        )
        .sort((a, b) => b.deviation_detect_time.localeCompare(a.deviation_detect_time))
        .filter((b, i, arr) => arr.findIndex(el => el.name === b.name &&
            el.category === b.category &&
            el.type === 'tenant') === i);
}

function getDates(startDate: string, endDate: string) : string[] {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

function addDays(currentDate: string, days: number) {
    var date = new Date(currentDate.valueOf());
    date.setDate(date.getDate() + days);
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
        transformed_item = updateTransformedItemForGroupUserBaseline(transformed_item, curr.group_name, curr.user_id, user.userPrincipalName!);
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
}