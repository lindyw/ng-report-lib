import { Injectable } from '@angular/core';
import { User } from '@microsoft/microsoft-graph-types-beta';
import { BehaviorSubject, filter, take } from 'rxjs';
import { BaselineDeviation, Category, CombinedDeviation, CurrentPostureCount, Header, TopAlert, TopBaselineDeviation } from '../interfaces/ng-oct-report.interface';
import { filterTopBaselines, GroupBaselineDeviationWithTimelineElementsByBaseline } from '../utils';

@Injectable({
    providedIn: 'root'
})
export class NgOctReportService {

    public header$ = new BehaviorSubject<Header | null>(null);
    public categories$ = new BehaviorSubject<Category[] | null>(null);
    public graphUsers$ = new BehaviorSubject<User[] | null>(null);
    public topAlerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    /**
    *  @param tenant_count -  @param has_deviated the number of tenant baselines that are currently deviating @param not_deviated the number of tenant baselines that are currently passing 
    * @param group_count -  @param has_deviated the number of group baselines that are currently deviating @param has_deviated the number of group baselines that are currently passing
    */
    public allBaselines_posture_count$ = new BehaviorSubject<{ tenant_count: CurrentPostureCount, group_count: CurrentPostureCount } | null>(null);
    /**
     *  topBaselines$ - baselines that are deviating in the end of the selected period
     */
    public topBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    /**
    *  Baselines$ - an array of baselines, contains a timeline of changes (created, deviation, remediation) on each baseline within the selected period
    */
    public Baselines$ = new BehaviorSubject<BaselineDeviation[] | null>(null);

    /**
     * set the header information for the report
     * @param {Header} header - the object contains, @date start & end date of the selected period and @tenant the tenant name
     */
    public setHeader(header: Header): void {
        this.header$.next(header);
    }
    /**
       * set the categories list along with each baseline name
       * @param {Category[]} categories - all the categories with its baseline name
       * @todo need to add category for tenant baseline : External (Guest) Users Resharing, we hardcode its category and type here for now
       */
    public setCategories(categories: Category[]) {
        if (categories.find(c => c.name === 'External (Guest) Users Resharing') === undefined) {
            categories.push({
                category: "Sharing",
                type: "tenant",
                name: "External (Guest) Users Resharing"
            })
        }
        this.categories$.next(categories);
    }
    /**
           * set the users array fetched from graph API
           * @param {User[]} users - an array of graph users
           */
    public setGraphUsers(users: User[]) {
        this.graphUsers$.next(users);
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

    /**
    * pass in the raw baseline deviations array within the selected period from sway, and transform data to topBaselines$ and Baselines$ 
    * @output topBaselines$ - baselines that are still deviating in the end of the selected period
    * @output baselines$ - (Security Control) an array of baselines, contains a timeline of changes (created, deviation, remediation) on each baseline
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
        let top_baselines = filterTopBaselines(baseline_deviations);
        this.topBaselines$.next(top_baselines);
        this.graphUsers$
            .pipe(
                filter(users => users !== null),
                take(1)
            ).subscribe((users) => {
                let formatted_baseline_deviations = GroupBaselineDeviationWithTimelineElementsByBaseline(baseline_deviations, users as User[]);
                this.Baselines$.next(formatted_baseline_deviations);
            })
    }

    constructor() { }
}
