import { Component, OnInit } from '@angular/core';
import { User } from '@microsoft/microsoft-graph-types-beta';
import { TopAlert } from 'projects/ng-oct-report/src/lib/interfaces/ng-oct-report.interface';
import { NgOctReportService } from 'projects/ng-oct-report/src/public-api';
import { baseline_deviations } from './test-data/baseline-deviations.data';
import { categories } from './test-data/categories.data';
import { graphUsers } from './test-data/graph-users.data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ng-report-showcase';

    private header = {
        date: {
            start: '2022-08-01',
            end: '2022-09-16'
        },
        tenant: 'Contoso'
    }

    private topAlerts: TopAlert[] =
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

    constructor(private reportService: NgOctReportService) {

    }

    ngOnInit(): void {
        this.reportService.setGraphUsers(graphUsers as User[]);
        this.reportService.setHeader(this.header);
        this.reportService.setCategories(categories);
        this.reportService.createTopAlerts(this.topAlerts);
        this.reportService.setAllBaselineCurrentPostureCount({ tenant_count: { has_deviated: 7, not_deviated: 23 }, group_count: { has_deviated: 5, not_deviated: 11 } });
        this.reportService.getBaselineDeviations(baseline_deviations);

    }


}
