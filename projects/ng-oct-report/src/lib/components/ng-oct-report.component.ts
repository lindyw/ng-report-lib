import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest, delay, distinct, map } from 'rxjs';
import { BaselineDeviation, BaselinePostureCountsByDate, Category, CurrentPostureCount, GroupBaselineDeviation, Header, TicketCount, TopAlert, TopBaselineDeviation, TopUser } from '../interfaces/ng-oct-report.interface';
import { CategoryService } from '../services/category.service';
import { NgOctReportService } from '../services/ng-oct-report.service';
import { groupBy } from '../utils';

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
    ticketCount$ = new BehaviorSubject<TicketCount[] | null>(null);
    alertsByUsers$ = new BehaviorSubject<TopUser[] | null>(null);
    tenant_baselines_posture_controls_in_this_period$ = new BehaviorSubject<BaselinePostureCountsByDate | null>(null);
    group_baselines_posture_controls_in_this_period$ = new BehaviorSubject<BaselinePostureCountsByDate | null>(null);
    topBaselineDeviations$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    baselineDeviations = new BehaviorSubject<BaselineDeviation[] | null>(null);

    loaded$: { [key: string]: BehaviorSubject<any> } = {
        'header': new BehaviorSubject(false),
        'categories': new BehaviorSubject(false),
        'all_baselines_current_posture_count': new BehaviorSubject(false),
        'tenant_baselines_posture_controls_in_this_period': new BehaviorSubject(false),
        'group_baselines_posture_controls_in_this_period': new BehaviorSubject(false),
        'top_alerts': new BehaviorSubject(false),
        'ticket_count': new BehaviorSubject(false),
        'top_baseline_deviations': new BehaviorSubject(false),
        'baseline_deviations': new BehaviorSubject(false)
    };

    public all_loaded$ = combineLatest([
        this.loaded$['header'],
        this.loaded$['categories'],
        this.loaded$['tenant_baselines_posture_controls_in_this_period'],
        this.loaded$['group_baselines_posture_controls_in_this_period'],
        this.loaded$['all_baselines_current_posture_count'],
        this.loaded$['top_alerts'],
        this.loaded$['ticket_count'],
        this.loaded$['top_baseline_deviations'],
        this.loaded$['baseline_deviations']
    ])
        .pipe(
            delay(2000),
            map(all_loaded => all_loaded.every(loaded => loaded))
        )

    tenant_catagories: string[] = [];
    group_categories: string[] = [];

    baselines_by_tc: { [tenant_category: string]: BaselineDeviation[] } = {};
    baselines_by_gc: { [group_category: string]: GroupBaselineDeviation } = {};

    hasPSA: boolean = false;

    constructor(
        private reportService: NgOctReportService,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.loadHeader();
        this.loadCategories();
        this.loadAllBaselinePostureCount();
        this.loadTopAlerts();
        this.loadTicketCount();
        this.loadBaselinesPostureControlsInThisPeriod();
        this.loadTopBaselineDeviations();
        this.loadBaselineDeviations();
    }

    loadHeader() {
        this.reportService.header$
            .pipe(
                distinct()
            )
            .subscribe(_header => {
                let header = _header;
                if (_header != null) {
                    header = {
                        ..._header, date: {
                            start: dateFormat(_header?.date.start),
                            end: dateFormat(_header?.date.end)
                        }
                    }
                    if (!!_header.icon) {
                        header = {
                            ...header,
                            icon: _header.icon
                        }
                    }
                }
                this.header$.next(header);
                this.loaded$['header'].next(true);
            });
    }

    loadCategories() {
        this.tenant_catagories = this.categoryService.tenant_categories;
        this.group_categories = this.categoryService.group_categories;
        this.loaded$['categories'].next(true);
    }

    loadTopAlerts() {
        this.reportService.topAlerts$
            .pipe(
                distinct()
            )
            .subscribe(alerts => {
                let alertsByUsers: any[] | null = [];
                if (!!alerts) {
                    alerts = alerts
                        .filter(a => a.source_type === 'microsoft-event')
                        .map(a => ({ ...a, timestamp: new Date(a.timestamp).toString() }))

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

    loadTicketCount() {
        this.reportService.ticketCount$
            .pipe(
                distinct()
            )
            .subscribe(ticket_counts => {
                console.log('ticket_counts', ticket_counts);
                if (!!ticket_counts && ticket_counts!.length > 0) {
                    this.ticketCount$.next(ticket_counts);
                    this.hasPSA = true;
                } else {
                    this.hasPSA = false;
                }
                this.loaded$['ticket_count'].next(true);
                console.log('hasPSA', this.hasPSA);

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

    loadBaselinesPostureControlsInThisPeriod() {
        this.reportService.tenant_baselines_posture_controls_in_this_period$
            .pipe(
                distinct()
            )
            .subscribe(posture_controls_count => {
                this.tenant_baselines_posture_controls_in_this_period$.next(posture_controls_count);
                this.loaded$['tenant_baselines_posture_controls_in_this_period'].next(true)
            })
        this.reportService.group_baselines_posture_controls_in_this_period$
            .pipe(
                distinct()
            )
            .subscribe(posture_controls_count => {
                this.group_baselines_posture_controls_in_this_period$.next(posture_controls_count);
                this.loaded$['group_baselines_posture_controls_in_this_period'].next(true)
            })
    }

    loadTopBaselineDeviations() {
        this.reportService.top_baseline_deviations$
            .pipe(
                distinct()
            )
            .subscribe(top_baseline_deviations => {
                this.topBaselineDeviations$.next(top_baseline_deviations);
                this.loaded$['top_baseline_deviations'].next(true);
            })
    }

    loadBaselineDeviations() {
        combineLatest([
            this.header$,
            this.reportService.baseline_deviations$
        ])
            .pipe(
                distinct()
            )
            .subscribe(([header, baseline_deviations]) => {
                this.baselineDeviations.next(baseline_deviations);
                for (var tc of this.tenant_catagories) {
                    this.baselines_by_tc[tc] = this.groupBaselinesByCategory(tc, 'tenant', header?.date.start!, header?.date.end!);
                }
                for (var gc of this.group_categories) {
                    this.baselines_by_gc[gc] = this.groupBaselinesByCategory(gc, 'group', header?.date.start!, header?.date.end!);
                }
                this.loaded$['baseline_deviations'].next(true);
            })
    }


    public groupBaselinesByCategory(category: string, type: 'group' | 'tenant', start: string, end: string): any {
        let baselines = this.baselineDeviations.getValue();
        if (!baselines) {
            return [];
        }
        else {
            let found_baselines = baselines
                .filter(b => b.category === category && b.type === type)
                .map(b => ({
                    ...b,
                    timelineElements: b.timelineElements.filter(el => el.date >= new Date(start) && el.date <= new Date(end) || el.status === 'created')
                }));
            if (type === 'tenant') {
                return this.groupTenantBaselinesByCategory(category, found_baselines);
            } else if (type === 'group') {
                return this.groupGroupBaselinesByCategory(found_baselines);
            }

        }
    }

    private groupTenantBaselinesByCategory(category: string, found_baselines: BaselineDeviation[]) {
        let categories = this.categoryService.categories;
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
