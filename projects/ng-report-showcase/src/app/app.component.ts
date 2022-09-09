import { Component, OnInit } from '@angular/core';
import { BaselineDeviation, Category, TopAlert, TopBaselineDeviation } from 'projects/ng-oct-report/src/lib/ng-oct-report.interface';
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

    currentBaselines: TopBaselineDeviation[] =
        [
            { severity: 'warning', timestamp: '2022-08-02T22:28:35.999Z', category: 'Admin Settings', 'name': 'Admin Audit Log' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:14.999Z', category: 'Remote Access Settings', 'name': 'SMTP' },
        ]


    topBaselines: TopBaselineDeviation[] =
        [
            { severity: 'warning', timestamp: '2022-08-02T22:28:59.999Z', category: 'Sharing Settings', 'name': 'Common Attachments Filter' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:35.999Z', category: 'Admin Settings', 'name': 'Admin Audit Log' },
            { severity: 'warning', timestamp: '2022-08-02T22:28:14.999Z', category: 'Remote Access Settings', 'name': 'SMTP' },
        ]

    baselines: BaselineDeviation[] =
        [
            {
                baseline_id: "910214bb-d80b-4b3e-b849-7ea897e8ef33",
                category: "Remote Access",
                name: "Modern Authentication",
                timelineElements: [
                    {
                        date: new Date("2022-07-21T15:44:13.219Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-22T00:45:06.719Z"),
                        status: "remediated"
                    }
                ]
            },
            {
                baseline_id: "0e2d3852-f7cd-41d9-81b0-943a00f6979b",
                category: "Audit",
                name: "Unified Audit Log",
                timelineElements: [
                    {
                        date: new Date("2022-07-19T09:21:08.880Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T09:21:44.903Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T12:03:49.727Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T12:31:27.939Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T12:34:17.888Z"),
                        status: "deviation"
                    }
                ]
            },
            {
                baseline_id: "230785da-ee6d-4b6f-b311-ff70a92d15f0",
                category: "Audit",
                name: "Mailbox Audit Log",
                timelineElements: [
                    {
                        date: new Date("2022-07-21T15:44:12.503Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-22T00:45:09.330Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T12:19:42.612Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T12:19:43.340Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T12:19:59.448Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T12:20:00.837Z"),
                        status: "remediated"
                    }
                ]
            },
            {
                baseline_id: "8880cf25-6e78-4535-85c1-ff15d877ce53",
                category: "Sharing",
                name: "Anonymous Links Expiry",
                timelineElements: [
                    {
                        date: new Date("2022-07-05T14:46:03.962Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-15T12:00:59.157Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-08-03T10:39:29.355Z"),
                        status: "created"
                    },
                    {
                        date: new Date("2022-08-30T16:34:05.681Z"),
                        status: "deviation"
                    }
                ]
            },
            {
                "category": null,
                "name": "OWA Access",
                "baseline_id": "910214bb-d80b-4b3e-b849-7ea897e8ef33",
                "timelineElements": [
                    {
                        "date": new Date("2022-07-08T13:08:14.435Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.462Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.579Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.581Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.611Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.617Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.619Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.628Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.631Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.637Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.641Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.641Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.646Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.677Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-08T13:08:15.749Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-25T12:14:13.024Z"),
                        "status": "deviation"
                    },
                    {
                        "date": new Date("2022-07-25T12:14:13.031Z"),
                        "status": "deviation"
                    }
                ],
                "group_name": "Default",
                "user_id": "d279bb63-cce0-4feb-9fbd-610b954f4070"
            },
            {
                "category": null,
                "name": "OWA Access",
                "baseline_id": "0e2d3852-f7cd-41d9-81b0-943a00f6979b",
                "timelineElements": [
                    {
                        "date": new Date("2022-07-19T18:43:54.043Z"),
                        "status": "deviation"
                    }
                ]
            },
            {
                baseline_id: "541fa8a8-1a7b-4380-8e97-9388f997640d",
                category: null,
                name: "POP3 Access",
                timelineElements: [
                    {
                        date: new Date("2022-07-15T12:45:24.978Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:55.507Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:55.846Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:56.186Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:56.466Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:56.736Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:57.036Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:57.287Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:57.618Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:57.930Z"),
                        status: "deviation"
                    }
                ]
            },
            {
                baseline_id: "910214bb-d80b-4b3e-b849-7ea897e8ef33",
                category: null,
                name: "IMAP Access",
                timelineElements: [
                    {
                        date: new Date("2022-07-15T12:45:23.920Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-15T12:45:24.637Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:54.628Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:55.147Z"),
                        status: "deviation"
                    }
                ]
            },
            {
                baseline_id: "810214bb-d80b-4b3e-b849-7ea897e8ef33",
                category: "Authentication & Authorisation",
                name: "MFA Conditional Access Policy",
                timelineElements: [
                    {
                        date: new Date("2022-07-06T12:53:33.393Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-24T21:00:55.147Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-24T21:02:23.420Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-24T21:07:26.990Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T11:56:05.641Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T11:56:06.287Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T11:56:53.321Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T12:03:35.525Z"),
                        status: "remediated"
                    }
                ]
            },
            {
                baseline_id: "123214bb-d80b-4b3e-b849-7ea897e8ef33",
                category: "General",
                name: "Security Defaults Policy",
                timelineElements: [
                    {
                        date: new Date("2022-07-06T12:48:27.821Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-06T12:50:10.679Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-06T13:07:50.988Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-06T13:08:08.969Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-06T13:08:12.802Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-06T13:08:13.003Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-06T13:08:17.858Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-06T13:08:18.041Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-06T13:10:03.466Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-06T13:10:03.635Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-24T21:02:02.524Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-24T21:02:05.178Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T11:54:51.407Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T11:56:16.517Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T11:56:30.044Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T11:56:31.449Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-25T11:56:35.744Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-25T11:56:37.163Z"),
                        status: "remediated"
                    }
                ]
            },
            {
                baseline_id: "273c5eca-8e27-4dbf-99a9-40978dd26dbe",
                category: null,
                name: "SMTP Client Authentication",
                timelineElements: [
                    {
                        date: new Date("2022-07-15T12:45:25.296Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-15T12:45:25.600Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:58.232Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-19T18:43:58.610Z"),
                        status: "deviation"
                    }
                ]
            },
            {
                baseline_id: "373c5eca-8e27-4dbf-99a9-40978dd26dbe",
                category: "Mobile Access",
                name: "Default Mobile Device Mailbox Policy",
                timelineElements: [
                    {
                        date: new Date("2022-07-20T12:50:20.007Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-20T12:52:16.068Z"),
                        status: "remediated"
                    },
                    {
                        date: new Date("2022-07-20T15:34:52.113Z"),
                        status: "deviation"
                    },
                    {
                        date: new Date("2022-07-20T15:35:01.899Z"),
                        status: "remediated"
                    }
                ]
            }
        ]

    categories: Category[] =
        [
            { category: "Email Security", name: "Preset EOP Policy (Strict)" },
            { category: "Email Security", name: "Preset EOP Policy (Standard)" },
            {
                category: "Email Security",
                name: "Malware Internal Sender Filter Notification Policy"
            },
            {
                category: "Email Security",
                name: "Malware File Types Filter Policy"
            },
            {
                category: "Email Security",
                name: "Standard Default Anti Phishing Policy"
            },
            {
                category: "Email Security",
                name: "Default Hosted Outbound Spam Filter Policy"
            },
            { category: "Email Security", name: "DKIM Signing for Default Domain" },
            { category: "Email Security", name: "Mail Auto Forwarding" },
            { category: "Audit", name: "Mailbox Audit Log" },
            { category: "Audit", name: "Unified Audit Log" },
            {
                category: "Authentication & Authorisation",
                name: "Legacy Auth Conditional Access Policy"
            },
            {
                category: "Authentication & Authorisation",
                name: "MFA Conditional Access Policy"
            },
            {
                category: "Authentication & Authorisation",
                name: "SharePoint Modern Auth"
            },
            { category: "Authentication & Authorisation", name: "Password Policy" },
            {
                category: "Authentication & Authorisation",
                name: "Customer Lockbox"
            },
            { category: "Sharing", name: "Anonymous Links Expiry" },
            { category: "Sharing", name: "External Users Resharing" },
            {
                category: "Mobile Access",
                name: "Default Mobile Device Mailbox Policy"
            },
            { category: "General", name: "Security Defaults Policy" },
            { category: "Remote Access", name: "Modern Authentication" },
            { category: "Remote Access", name: "SMTP Access" }
        ]


    constructor(private reportService: NgOctReportService) {

    }

    ngOnInit(): void {
        this.reportService.createHeader(this.header);
        this.reportService.createTopAlerts(this.topAlerts);
        this.reportService.countBaselines(33);
        this.reportService.createCurrentBaselineDeviations(this.currentBaselines);
        this.reportService.createTopBaselineDeviations(this.topBaselines);
        this.reportService.createBaselineDeviations(this.baselines);
        this.reportService.allCategories(this.categories);
    }


}
