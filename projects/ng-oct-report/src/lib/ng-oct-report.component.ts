import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, filter, distinct, take } from 'rxjs';
import { BaselineDeviation, Category, Header, TopAlert, TopBaselineDeviation, TopUser } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';
import { groupBy } from './utils';

function dateFormat(a: string) {
    return DateTime.fromISO(a).toFormat('ccc, LLL dd yyyy');
}

@Component({
    selector: 'ng-oct-report',
    templateUrl: './ng-oct-report.component.html',
    styleUrls: ['./ng-oct-report.component.scss']
})
export class NgOctReportComponent implements OnInit {

    header$ = new BehaviorSubject<Header | null>(null);
    alerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    alertsByUsers$ = new BehaviorSubject<TopUser[] | null>(null);
    baselinesCount$ = new BehaviorSubject<number | null>(null);
    currentBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    topBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    baselines$ = new BehaviorSubject<BaselineDeviation[] | null>(null);
    categories$ = new BehaviorSubject<Category[]>([]);

    tenant_catagories: string[] = [];
    group_categories: string[] = ['Group Remote Access'];

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.loadHeader();
        this.loadCategories();
        this.loadTopAlerts();
        this.loadTopBaselines();
        this.loadBaselines();

    }

    loadHeader() {
        this.reportService.header$.subscribe(header => {
            if (header != null) {
                header = {
                    ...header, date: {
                        start: dateFormat(header?.date.start),
                        end: dateFormat(header?.date.end)
                    }
                }
            }
            this.header$.next(header);
        });
    }

    loadTopAlerts() {
        this.reportService.topAlerts$
            .pipe(
                distinct()
            )
            .subscribe(alerts => {
                let alertsByUsers: any[] | null = [];
                if (!!alerts) {
                    alerts = alerts.map(a => ({ ...a, timestamp: new Date(a.timestamp).toString() }))
                    const groupedObjByUser = groupBy(alerts.filter(a => !!a.actor), 'actor');
                    alertsByUsers = Object.keys(groupedObjByUser)
                        .map(k => ({
                            actor: k, alerts: groupedObjByUser[k], counts: {
                                critical: groupedObjByUser[k].filter((a: TopAlert) => a.severity === 'critical').length,
                                danger: groupedObjByUser[k].filter((a: TopAlert) => a.severity === 'danger').length,
                                warning: groupedObjByUser[k].filter((a: TopAlert) => a.severity === 'warning').length
                            }
                        }))
                        .sort((a, b) => (a.counts.critical > b.counts.critical) ?
                            -1 : (a.counts.critical === b.counts.critical) ?
                                ((a.counts.danger > b.counts.danger) ?
                                    -1 : (a.counts.danger === b.counts.danger) ?
                                        ((a.counts.warning > b.counts.warning) ?
                                            -1 : (a.counts.warning === b.counts.warning) ?
                                                -1 : 1)
                                        : 1) : 1)
                        .splice(0, 5)

                }
                console.log('alerts', alerts);
                this.alerts$.next(alerts);
                this.alertsByUsers$.next(alertsByUsers);
            })

    }

    loadTopBaselines() {
        this.reportService.number_of_baselines$
            .pipe(
                distinct()
            )
            .subscribe(count => {
                console.log(count);
                this.baselinesCount$.next(count);
            })

        this.reportService.topBaselines$
            .pipe(
                distinct()
            )
            .subscribe(baselines => {
                if (!!baselines) {
                    baselines = baselines.map(b => ({ ...b, timestamp: new Date(b.timestamp).toString() }))
                }
                this.topBaselines$.next(baselines)
            })

        this.reportService.currentBaselines$
            .pipe(
                distinct()
            )
            .subscribe(baselines => {
                if (!!baselines) {
                    baselines = baselines.map(b => ({ ...b, timestamp: new Date(b.timestamp).toString() }))
                }
                this.currentBaselines$.next(baselines)
            })
    }

    loadBaselines() {
        this.reportService.Baselines$
            .pipe(
                distinct()
            )
            .subscribe(baselines => {
                console.log('baselines', baselines);
                this.baselines$.next(baselines);
            })
    }

    loadCategories() {
        this.reportService.Categories$
            .pipe(
                distinct(),
                filter(categories => !!categories)
            )
            .subscribe(categories => {
                this.categories$.next(categories!);
                const categories_set = [... new Set(categories?.map(c => c.category))];
                // categories_set.push('Group Baselines');
                this.tenant_catagories = categories_set;
            })
    }

    public baselinesByCategory(category: string): any {
        let baselines = this.baselines$.getValue();
        if (!baselines) {
            return [];
        }
        else {
            let found_baselines = category === 'Group Remote Access' ? baselines.filter(b => b.category === null) : baselines.filter(b => b.category === category);

            if (category !== 'Group Remote Access') {
                let categories = this.categories$.getValue();
                let category_with_baseline_names = categories.filter(c => c.category === category);
                let empty_baselines_by_category = category_with_baseline_names.filter(function (c) {
                    return found_baselines.find(b => b.name === c.name) === undefined
                })
                let baselinesByCategory = [...found_baselines];
                for (var b of empty_baselines_by_category) {
                    baselinesByCategory.push({
                        ...b,
                        timelineElements: [],
                    })
                }
                return baselinesByCategory
            } else {
                let groupByBaselineName = formatGroupBaselinesObj(found_baselines);
                return groupByBaselineName
            }

        }

        function formatGroupBaselinesObj(baselines: BaselineDeviation[]) {
            let groupByBaselineName: {
                [b_name: string]: {
                    [g_name: string]: {
                        [user_name: string]: BaselineDeviation[];
                    };
                };
            } = {};
            let baseline_obj: { [b_name: string]: BaselineDeviation[]; } = groupBy(baselines, 'name');

            Object.entries(baseline_obj).forEach(([b_name, arr1]) => {
                let grouped_by_baseline_and_group_name: {
                    [g_name: string]: {
                        [user_name: string]: BaselineDeviation[];
                    };
                } = {};

                let group_obj: { [g_name: string]: BaselineDeviation[]; } = groupBy(arr1, 'group_name');

                Object.entries(group_obj).forEach(([g_name, arr2]) => {
                    let user_obj: { [user_name: string]: BaselineDeviation[]; } = groupBy(arr2, 'user_name');
                    if (g_name !== 'undefined') {
                        grouped_by_baseline_and_group_name[g_name] = user_obj;
                    }
                });
                groupByBaselineName[b_name] = grouped_by_baseline_and_group_name;
            });
            return groupByBaselineName;
        }
    }

}
