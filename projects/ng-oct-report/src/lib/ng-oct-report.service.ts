import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaselineDeviation, Category, Header, TopAlert, TopBaselineDeviation } from './ng-oct-report.interface';

@Injectable({
    providedIn: 'root'
})
export class NgOctReportService {

    public header$ = new BehaviorSubject<Header | null>(null);
    public topAlerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    public number_of_baselines$ = new BehaviorSubject<number | null>(null);
    public currentBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    public topBaselines$ = new BehaviorSubject<TopBaselineDeviation[] | null>(null);
    // Security Control
    public Baselines$ = new BehaviorSubject<BaselineDeviation[] | null>(null);
    public Categories$ = new BehaviorSubject<Category[] | null>(null);

    public createHeader(header: Header): void {
        this.header$.next(header);
    }

    public createTopAlerts(alerts: TopAlert[]) {
        this.topAlerts$.next(alerts);
    }

    public countBaselines(count: number) {
        this.number_of_baselines$.next(count);
    }

    public createCurrentBaselineDeviations(baselines: TopBaselineDeviation[]) {
        this.currentBaselines$.next(baselines);
    }

    public createTopBaselineDeviations(baselines: TopBaselineDeviation[]) {
        this.topBaselines$.next(baselines);
    }

    public createBaselineDeviations(baselines: BaselineDeviation[]) {
        this.Baselines$.next(baselines);
    }

    public allCategories(categories: Category[]) {
        this.Categories$.next(categories);
    }

    constructor() { }
}
