import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { Header, TopAlert } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';

@Component({
    selector: 'lib-ng-oct-report',
    templateUrl: './ng-oct-report.component.html',
    styleUrls: ['./ng-oct-report.component.css']
})
export class NgOctReportComponent implements OnInit {

    header$ = new Subject<Header>();
    topAlerts$ = new Subject<TopAlert[]>();

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.reportService.header$.subscribe(header => this.header$.next(header));
    }

}
