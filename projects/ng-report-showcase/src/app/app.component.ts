import { Component, OnInit } from '@angular/core';
import { Baseline, Category, TopAlert, TopBaseline } from 'projects/ng-oct-report/src/lib/ng-oct-report.interface';
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
            { severity: 'critical', timestamp: '2022-08-02T22:28:35.999Z', actor: 'bob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'cobby.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'cobby.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: null, 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'bob.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'mia.lobster@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'cobby.husky@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user2@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user3@octiga.com', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user2@octiga.com', 'description': 'Login from Country not in Allowed List' }
        ]

    topBaselines: TopBaseline[] =
        [
            { severity: 'warning', timestamp: '2022-08-02T22:28:59.999Z', category: 'Sharing Settings', 'name': 'Common Attachments Filter' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:35.999Z', category: 'Admin Settings', 'name': 'Admin Audit Log' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:14.999Z', category: 'Remote Access Settings', 'name': 'SMTP' },
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

    categories: Category[] =
        [
            { "category": "Email Security", "name": "Preset EOP Policy (Strict)" },
            { "category": "Email Security", "name": "Preset EOP Policy (Standard)" },
            {
                "category": "Email Security",
                "name": "Malware Internal Sender Filter Notification Policy"
            },
            {
                "category": "Email Security",
                "name": "Malware File Types Filter Policy"
            },
            {
                "category": "Email Security",
                "name": "Standard Default Anti Phishing Policy"
            },
            {
                "category": "Email Security",
                "name": "Default Hosted Outbound Spam Filter Policy"
            },
            { "category": "Email Security", "name": "DKIM Signing for Default Domain" },
            { "category": "Email Security", "name": "Mail Auto Forwarding" },
            { "category": "Audit", "name": "Mailbox Audit Log" },
            { "category": "Audit", "name": "Unified Audit Log" },
            {
                "category": "Authentication & Authorisation",
                "name": "Legacy Auth Conditional Access Policy"
            },
            {
                "category": "Authentication & Authorisation",
                "name": "MFA Conditional Access Policy"
            },
            {
                "category": "Authentication & Authorisation",
                "name": "SharePoint Modern Auth"
            },
            { "category": "Authentication & Authorisation", "name": "Password Policy" },
            {
                "category": "Authentication & Authorisation",
                "name": "Customer Lockbox"
            },
            { "category": "Sharing", "name": "Anonymous Links Expiry" },
            { "category": "Sharing", "name": "External Users Resharing" },
            {
                "category": "Mobile Access",
                "name": "Default Mobile Device Mailbox Policy"
            },
            { "category": "General", "name": "Security Defaults Policy" },
            { "category": "Remote Access", "name": "Modern Authentication" },
            { "category": "Remote Access", "name": "SMTP Access" }
        ]


    constructor(private reportService: NgOctReportService) {

    }

    ngOnInit(): void {
        this.reportService.createHeader(this.header);
        this.reportService.createTopAlerts(this.topAlerts);
        this.reportService.createTopBaselines(this.topBaselines);
        this.reportService.createBaselines(this.baselines);
        this.reportService.allCategories(this.categories);
    }


}
