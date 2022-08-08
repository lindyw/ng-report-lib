import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Header, TopAlert } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';
import * as moment from 'moment';

function dateFormat(a: string) {
    return moment(a).format('ddd, MMM Do YYYY');
}

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
        this.loadHeader();
    }

    loadHeader() {
        this.reportService.header$.subscribe(header => {
            if (header != null) {
                header = {
                    ...header, date: {
                        start: dateFormat(header?.date.start),
                        end: dateFormat(header?.date.end)
                    }
                }
            }
            header
            this.header$.next(header);
        });
    }

}
