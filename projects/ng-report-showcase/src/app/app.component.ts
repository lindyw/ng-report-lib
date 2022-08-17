import { Component, OnInit } from '@angular/core';
import { Baseline, TopAlert, TopBaseline } from 'projects/ng-oct-report/src/lib/ng-oct-report.interface';
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
            end: '2022-08-16'
        },
        tenant: 'Contoso'
    }

    topAlerts: TopAlert[] =
        [
            { severity: 'critical', timestamp: '2022-08-02T22:28:999Z', actor: 'bob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:999Z', actor: 'rob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:999Z', actor: 'rob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' }
        ]

    topBaselines: TopBaseline[] =
        [
            { severity: 'warning', timestamp: '2022-08-02T22:28:999Z', category: 'Sharing Settings', 'name': 'Common Attachments Filter' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:999Z', category: 'Admin Settings', 'name': 'Admin Audit Log' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:999Z', category: 'Remote Access Settings', 'name': 'SMTP' },
        ]

    baselines: Baseline[] =
        [
            {
                category: 'Audit', name: 'Mailbox Audit Log', timelineElements: [
                    { date: new Date('2022-08-03T03:02:01.000Z'), status: 'created' },
                    { date: new Date('2022-08-03T03:03:01.000Z'), status: 'deviation' },
                    { date: new Date('2022-08-03T03:12:01.000Z'), status: 'remediated' },
                ]
            },
            {
                category: 'Audit', name: 'Unified Audit Log', timelineElements: [
                    { date: new Date('2022-08-03T03:02:01.000Z'), status: 'created' },
                    { date: new Date('2022-08-05T03:02:01.000Z'), status: 'deviation' },
                    { date: new Date('2022-08-05T12:12:01.000Z'), status: 'remediated' },
                    { date: new Date('2022-08-15T22:12:01.000Z'), status: 'deviation' },
                    { date: new Date('2022-08-15T22:22:01.000Z'), status: 'remediated' },
                    { date: new Date('2022-08-15T22:32:01.000Z'), status: 'deviation' },
                    { date: new Date('2022-08-15T22:35:01.000Z'), status: 'remediated' },
                ]
            },
            {
                category: 'Authentication & Authorisation', name: 'Customer Lockbox', timelineElements: [
                    { date: new Date('2022-08-03T03:02:01.000Z'), status: 'created' },
                    { date: new Date('2022-08-10T03:02:01.000Z'), status: 'deviation' }
                ]
            }

        ]


    constructor(private reportService: NgOctReportService) {

    }

    ngOnInit(): void {
        this.reportService.createHeader(this.header);
        this.reportService.createTopAlerts(this.topAlerts);
        this.reportService.createTopBaselines(this.topBaselines);
        this.reportService.createBaselines(this.baselines);
    }


}
