import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaselineDeviation, Category, CurrentPostureCount, Header, TopAlert, TopBaselineDeviation } from './ng-oct-report.interface';

@Injectable({
    providedIn: 'root'
})
export class NgOctReportService {

    public header$ = new BehaviorSubject<Header | null>(null);
    public topAlerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    public allBaselines_posture_count$ = new BehaviorSubject<CurrentPostureCount | null>(null);
    public topBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    // Security Control
    public Baselines$ = new BehaviorSubject<BaselineDeviation[] | null>(null);
    public Categories$ = new BehaviorSubject<Category[] | null>(null);

    public allCategories(categories: Category[]) {
        this.Categories$.next(categories);
    }

    public createHeader(header: Header): void {
        this.header$.next(header);
    }
    
    // All time
    public allBaselinePostureCount(counts: CurrentPostureCount) {
        this.allBaselines_posture_count$.next(counts);
    }
    // In this poeriod
    public createTopAlerts(alerts: TopAlert[]) {
        this.topAlerts$.next(alerts);
    }
    public createTopBaselineDeviations(baselines: TopBaselineDeviation[]) {
        this.topBaselines$.next(baselines);
    }
    public createBaselineDeviations(baselines: BaselineDeviation[]) {
        this.Baselines$.next(baselines);
    }

    constructor() { }
}
