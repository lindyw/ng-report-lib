import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, filter, distinct, take, Subject, combineLatest, map } from 'rxjs';
import { NgOctReportService } from '../services/ng-oct-report.service';
import { groupBy } from '../utils';
import { BaselineDeviation, Category, CurrentPostureCount, GroupBaselineDeviation, Header, TopAlert, TopBaselineDeviation, TopUser } from '../interfaces/ng-oct-report.interface';

function dateFormat(a: string) {
    return DateTime.fromISO(a, { zone: 'utc' }).toFormat('ccc, LLL dd yyyy');
}

@Component({
    selector: 'ng-oct-report',
    templateUrl: './ng-oct-report.component.html',
    styleUrls: ['./ng-oct-report.component.scss']
})
export class NgOctReportComponent implements OnInit {

    header$ = new BehaviorSubject<Header | null>(null);
    allBaselinesPostureCount$ = new BehaviorSubject<{ tenant_count: CurrentPostureCount, group_count: CurrentPostureCount } | null>(null);
    alerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    alertsByUsers$ = new BehaviorSubject<TopUser[] | null>(null);
    topBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    baselines$ = new BehaviorSubject<BaselineDeviation[] | null>(null);
    categories$ = new BehaviorSubject<Category[]>([]);

    loaded$: { [key: string]: BehaviorSubject<any> } = {
        'header': new BehaviorSubject(false),
        'categories': new BehaviorSubject(false),
        'all_baselines_current_posture_count': new BehaviorSubject(false),
        'top_alerts': new BehaviorSubject(false),
        'top_baselines': new BehaviorSubject(false),
        'baselines': new BehaviorSubject(false)
    };

    public all_loaded$ = combineLatest([
        this.loaded$['header'],
        this.loaded$['categories'],
        this.loaded$['all_baselines_current_posture_count'],
        this.loaded$['top_alerts'],
        this.loaded$['top_baselines'],
        this.loaded$['baselines']
    ])
        .pipe(
            map(all_loaded => all_loaded.every(loaded => loaded))
        )

    tenant_catagories: string[] = [];
    group_categories: string[] = [];

    baselines_by_tc: { [tenant_category: string]: BaselineDeviation[] } = {};
    baselines_by_gc: { [group_category: string]: GroupBaselineDeviation } = {};

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.loadHeader();
        this.loadCategories();
        this.loadAllBaselinePostureCount();
        this.loadTopAlerts();
        this.loadTopBaselines();
        this.loadBaselines();
    }

    loadHeader() {
        this.reportService.header$
            .pipe(
                distinct()
            )
            .subscribe(header => {
                if (header != null) {
                    header = {
                        ...header, date: {
                            start: dateFormat(header?.date.start),
                            end: dateFormat(header?.date.end)
                        }
                    }
                }
                this.header$.next(header);
                this.loaded$['header'].next(true);
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
                this.alerts$.next(alerts);
                this.alertsByUsers$.next(alertsByUsers);
                this.loaded$['top_alerts'].next(true);
            })

    }

    loadAllBaselinePostureCount() {
        this.reportService.allBaselines_posture_count$
            .pipe(
                distinct()
            )
            .subscribe(counts => {
                this.allBaselinesPostureCount$.next(counts);
                this.loaded$['all_baselines_current_posture_count'].next(true);
            })
    }

    loadTopBaselines() {
        this.reportService.topBaselines$
            .pipe(
                distinct()
            )
            .subscribe(baselines => {
                this.topBaselines$.next(baselines);
                this.loaded$['top_baselines'].next(true);
            })
    }

    loadBaselines() {
        this.reportService.Baselines$
            .pipe(
                distinct()
            )
            .subscribe(baselines => {
                this.baselines$.next(baselines);
                for (var tc of this.tenant_catagories) {
                    this.baselines_by_tc[tc] = this.groupBaselinesByCategory(tc, 'tenant');
                }
                for (var gc of this.group_categories) {
                    this.baselines_by_gc[gc] = this.groupBaselinesByCategory(gc, 'group');
                }
                this.loaded$['baselines'].next(true);
            })
    }

    loadCategories() {
        this.reportService.categories$
            .pipe(
                distinct()
            )
            .subscribe(categories => {
                this.categories$.next(categories!);
                this.tenant_catagories = [...new Set(categories?.filter(c => c.type === 'tenant').map(item => item['category']))];
                this.group_categories = [...new Set(categories?.filter(c => c.type === 'group').map(item => item['category']))];
                this.loaded$['categories'].next(true);
            })
    }

    public groupBaselinesByCategory(category: string, type: 'group' | 'tenant'): any {
        let baselines = this.baselines$.getValue();
        if (!baselines) {
            return [];
        }
        else {
            let found_baselines = baselines.filter(b => b.category === category && b.type === type);
            if (type === 'tenant') {
                return this.groupTenantBaselinesByCategory(category, found_baselines);
            } else if (type === 'group') {
                return this.groupGroupBaselinesByCategory(found_baselines);
            }

        }
    }

    private groupTenantBaselinesByCategory(category: string, found_baselines: BaselineDeviation[]) {
        let categories = this.categories$.getValue();
        let category_with_baseline_names = categories.filter(c => c.category === category && c.type === 'tenant');
        let empty_baselines_by_category = category_with_baseline_names.filter(function (c) {
            return found_baselines.find(b => b.name === c.name) === undefined;
        });
        let baselinesByCategory = [...found_baselines];
        for (var b of empty_baselines_by_category) {
            baselinesByCategory.push({
                ...b,
                timelineElements: [],
            });
        }
        return baselinesByCategory;
    }

    private groupGroupBaselinesByCategory(baselines: BaselineDeviation[]) {
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
