import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Header, TopAlert } from './ng-oct-report.interface';

@Injectable({
    providedIn: 'root'
})
export class NgOctReportService {

    public header$ = new Subject<Header>();
    public topAlerts$ = new Subject<TopAlert[]>();

    public createHeader(header: Header): void {
        this.header$.next(header);
    }

    public createTopAlerts(alerts: TopAlert[]) {
        this.topAlerts$.next(alerts);
    }

    constructor() { }
}
