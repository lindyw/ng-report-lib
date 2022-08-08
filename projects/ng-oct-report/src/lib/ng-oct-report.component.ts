import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Header, TopAlert } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';

@Component({
    selector: 'ng-oct-report',
    templateUrl: './ng-oct-report.component.html',
    styleUrls: ['./ng-oct-report.component.scss']
})
export class NgOctReportComponent implements OnInit {

    header$ = new BehaviorSubject<Header | null>(null);
    topAlerts$ = new BehaviorSubject<TopAlert[] | null>(null);

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.reportService.header$.subscribe(header => this.header$.next(header));
    }

}
