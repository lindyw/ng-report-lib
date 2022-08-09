import { Component, OnInit } from '@angular/core';
import { TopAlert, TopBaseline } from 'projects/ng-oct-report/src/lib/ng-oct-report.interface';
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
            { severity: 'critical', timestamp: '2022-08-02T22:28:999Z', actor: 'bob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:999Z', actor: 'rob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:999Z', actor: 'rob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' }
        ]

    topBaselines: TopBaseline[] =
        [
            { severity: 'warning', timestamp: '2022-08-02T22:28:999Z', catagory: 'Sharing Settings', 'name': 'Common Attachments Filter' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:999Z', catagory: 'Admin Settings', 'name': 'Admin Audit Log' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:999Z', catagory: 'Remote Access Settings', 'name': 'SMTP' },
        ]


    constructor(private reportService: NgOctReportService) {

    }

    ngOnInit(): void {
        this.reportService.createHeader(this.header);
        this.reportService.createTopAlerts(this.topAlerts);
        this.reportService.createTopBaselines(this.topBaselines);
    }


}
