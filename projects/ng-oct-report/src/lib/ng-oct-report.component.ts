import { Component, Input, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { Header, TopAlert } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';

@Component({
    selector: 'ng-oct-report',
    templateUrl: './ng-oct-report.component.html',
    styleUrls: ['./ng-oct-report.component.scss']
})
export class NgOctReportComponent implements OnInit {

    @Input() header: Header | null = null;
    @Input() topAlerts: TopAlert[] | null = null;

    header$ = new Subject<Header>();
    topAlerts$ = new Subject<TopAlert[]>();

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.reportService.header$.subscribe(header => this.header$.next(header));
    }

}
