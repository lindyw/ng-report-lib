import { Injectable } from '@angular/core';
import { User } from '@microsoft/microsoft-graph-types-beta';
import { BehaviorSubject, combineLatest, filter, map, take } from 'rxjs';
import { Baseline, BaselineDeviation, BaselinePostureCountsByDate, CombinedDeviation, CurrentPostureCount, Header, TicketCount, TopAlert, TopBaselineDeviation } from '../interfaces/ng-oct-report.interface';
import { filterTopBaselines, GetPostureControlsInThisPeriod, GroupBaselineDeviationWithTimelineElementsByBaseline } from '../utils';

@Injectable({
    providedIn: 'root'
})
export class NgOctReportService {

    public header$ = new BehaviorSubject<Header | null>(null);
    public graphUsers$ = new BehaviorSubject<User[] | null>(null);
    public topAlerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    public ticketCount$ = new BehaviorSubject<TicketCount[] | null>(null);
    /**
     * @param  {Baseline[]} baselines$ Obserservable of an array of baselines from the client tenant
     */
    public baselines$ = new BehaviorSubject<Baseline[] | null>(null);
    /**
    *  @param tenant_count -  @param has_deviated the number of tenant baselines that are currently deviating @param not_deviated the number of tenant baselines that are currently passing 
    *  @param group_count -  @param has_deviated the number of group baselines that are currently deviating @param has_deviated the number of group baselines that are currently passing
    */
    public allBaselines_posture_count$ = new BehaviorSubject<{ tenant_count: CurrentPostureCount, group_count: CurrentPostureCount } | null>(null);
    /**
     * @param {BaselinePostureCountsByDate} tenant_baselines_posture_controls_in_this_period - an Object list with tenant baselines' posture control counts (deviating, compliance, monitoring) by date in the selected period
     */
    public tenant_baselines_posture_controls_in_this_period$ = new BehaviorSubject<BaselinePostureCountsByDate | null>(null);
     /**
     * @param {BaselinePostureCountsByDate} group_baselines_posture_controls_in_this_period - an Object list with group baselines' posture control counts (deviating, compliance, monitoring) by date in the selected period
     */
      public group_baselines_posture_controls_in_this_period$ = new BehaviorSubject<BaselinePostureCountsByDate | null>(null);
    /**
     *  top_baseline_deviations$ - baselines that are deviating in the end of the selected period
     */
    public top_baseline_deviations$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    /**
    *  baseline_deviations$ - an array of baselines, contains a timeline of changes (created, deviation, remediation) on each baseline within the selected period
    */
    public baseline_deviations$ = new BehaviorSubject<BaselineDeviation[] | null>(null);

    /**
     * set the header information for the report
     * @param {Header} header - the object contains, @date start & end date of the selected period and @tenant the tenant name
     */
    public setHeader(header: Header): void {
        this.header$.next(header);
    }

    /**
     * set the users array fetched from graph API
     * @param {User[]} users - an array of graph users
     */
    public setGraphUsers(users: User[]) {
        this.graphUsers$.next(users);
    }

    public setBaselines(baselines: Baseline[]) {
        this.baselines$.next(baselines);
    }

    /**
      *  set the counts of tenant and group baselines that currently deviating and passing 
      *  @param tenant_count -  @param has_deviated the number of tenant baselines that are currently deviating @param not_deviated the number of tenant baselines that are currently passing 
      *  @param group_count -  @param has_deviated the number of group baselines that are currently deviating @param has_deviated the number of group baselines that are currently passing
    */
    public setAllBaselineCurrentPostureCount(counts: { tenant_count: CurrentPostureCount, group_count: CurrentPostureCount }) {
        this.allBaselines_posture_count$.next(counts);
    }

    /**
     * set the array of alerts that occurred in the selected period
     * @param {TopAlert[]} alerts - the array of Alert Items
     */
    public createTopAlerts(alerts: TopAlert[]) {
        this.topAlerts$.next(alerts);
    }

    public getTicketCount(ticket_counts: TicketCount[]) {
        this.ticketCount$.next(ticket_counts);
    }

    /**
    * pass in the raw baseline deviations array within the selected period from sway, and transform data to topBaselines$ and Baselines$ 
    * @output top_baseline_deviations$ - baselines that are still deviating in the end of the selected period
    * @output aseline_deviations$ - (Security Control) an array of baselines, contains a timeline of changes (created, deviation, remediation) on each baseline
    * @param {CombinedDeviation[]} baseline_deviations - the array of combined baseline deviations within the selected period
    * @todo need to add category for tenant baseline : External (Guest) Users Resharing, we hardcode its category and type here for now
    */
    public getBaselineDeviations(baseline_deviations: CombinedDeviation[]) {
        baseline_deviations = baseline_deviations.map(bd => {
            if (bd.name === "External (Guest) Users Resharing") {
                return {
                    ...bd,
                    category: 'Sharing',
                    type: 'tenant'
                }
            } else {
                return bd;
            }
        })
        let top_baseline_deviations = filterTopBaselines(baseline_deviations);
        this.top_baseline_deviations$.next(top_baseline_deviations);

        combineLatest([
            this.header$
                .pipe(
                    filter(header => header !== null),
                    map(header => header as Header),
                    take(1)
                ),
            this.graphUsers$
                .pipe(
                    filter(users => users !== null),
                    map(users => users as User),
                    take(1)
                ),
            this.baselines$
                .pipe(
                    filter(baselines => baselines !== null),
                    map((baselines => baselines as Baseline[])),
                    take(1)
                )
        ])
            .subscribe(([header, users, baselines]) => {
                const start = header.date.start;
                const end = header.date.end;

                let formatted_baseline_deviations = GroupBaselineDeviationWithTimelineElementsByBaseline(baseline_deviations, users as User[]);
                this.baseline_deviations$.next(formatted_baseline_deviations);  
                console.log('baseline_deviations',baseline_deviations);
                console.log('baselines',baselines)
                
                try {
                    const tenant_baselines_posture_controls_in_this_period = GetPostureControlsInThisPeriod(baseline_deviations, baselines, 'tenant', start, end);
                    this.tenant_baselines_posture_controls_in_this_period$.next(tenant_baselines_posture_controls_in_this_period);
    
                    const group_baselines_posture_control_in_this_period = GetPostureControlsInThisPeriod(baseline_deviations, baselines, 'group', start, end);
                    this.group_baselines_posture_controls_in_this_period$.next(group_baselines_posture_control_in_this_period);
                } catch (e: any) {
                    console.log(header, users, baselines);
                    console.log('error', e);

                }
             
            })

    }

    constructor() { }
}
