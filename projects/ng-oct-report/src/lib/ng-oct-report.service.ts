import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Baseline, Header, TopAlert, TopBaseline } from './ng-oct-report.interface';

@Injectable({
    providedIn: 'root'
})
export class NgOctReportService {

    public header$ = new BehaviorSubject<Header | null>(null);
    public topAlerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    public topBaselines$ = new BehaviorSubject<TopBaseline[] | null>(null);
    // Security Control
    public Baselines$ = new BehaviorSubject<Baseline[] | null>(null);

    public createHeader(header: Header): void {
        this.header$.next(header);
    }

    public createTopAlerts(alerts: TopAlert[]) {
        this.topAlerts$.next(alerts);
    }

    public createTopBaselines(baselines: TopBaseline[]) {
        this.topBaselines$.next(baselines);
    }

    public createBaselines(baselines: Baseline[]) {
        this.Baselines$.next(baselines);
    }

    constructor() { }
}
