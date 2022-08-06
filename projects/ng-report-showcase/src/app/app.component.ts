import { Component, OnInit } from '@angular/core';
import { TopAlert } from 'projects/ng-oct-report/src/lib/ng-oct-report.interface';
import { NgOctReportService } from 'projects/ng-oct-report/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ng-report-showcase';

    header = {
        date: {
            start: '2022-08-01',
            end: '2022-08-06'
        },
        tenant: 'Octiga Software Ltd.'
    }

    topAlerts: TopAlert[] =
        [
            { severity: 'critical', timestamp: '2022-08-02T22:28:999Z', user: 'bob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' }
        ]


    constructor(private reportService: NgOctReportService) {

    }

    ngOnInit(): void {

    }


}
