import { Component, OnInit } from '@angular/core';
import { User } from '@microsoft/microsoft-graph-types-beta';
import { TopAlert } from 'projects/ng-oct-report/src/lib/interfaces/ng-oct-report.interface';
import { CategoryService } from 'projects/ng-oct-report/src/lib/services/category.service';
import { NgOctReportService } from 'projects/ng-oct-report/src/public-api';
import { baseline_deviations } from './test-data/baseline-deviations.data';
import { baselines } from './test-data/baselines.data';
import { categories } from './test-data/categories.data';
import { graphUsers } from './test-data/graph-users.data';
import { ticket_counts } from './test-data/ticket.data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ng-report-showcase';

    private header = {
        date: {
            start: '2022-07-28',
            end: '2022-09-27'
        },
        tenant: 'Contoso'
    }


    private topAlerts: TopAlert[] =
        [
            { severity: 'critical', timestamp: '2022-08-02T22:28:35.999Z', actor: 'bob.husky@octiga.com', 'source_type': 'microsoft-event', 'country': 'Indonesia', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'cobby.husky@octiga.com', 'source_type': 'microsoft-event', 'country': 'The United State of America', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'cobby.husky@octiga.com', 'source_type': 'microsoft-event', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: null, 'source_type': 'microsoft-event', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'bob.husky@octiga.com', 'source_type': 'microsoft-event','country': 'The United State of America', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'mia.lobster@octiga.com', 'source_type': 'microsoft-event', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'cobby.husky@octiga.com', 'source_type': 'microsoft-event', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user@octiga.com', 'source_type': 'microsoft-event', 'country': 'Netherland','description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user2@octiga.com', 'source_type': 'microsoft-event','country': 'Netherland', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user3@octiga.com', 'source_type': 'sway-deviation', 'description': 'Login from Country not in Allowed List' },
            { severity: 'danger', timestamp: '2022-08-02T22:28:59.999Z', actor: 'test.user2@octiga.com', 'source_type': 'microsoft-event', 'country': 'Spain', 'description': 'Login from Country not in Allowed List' }
        ]

    constructor(
        private reportService: NgOctReportService,
        private categoryService: CategoryService
    ) {

    }

    ngOnInit(): void {
        this.reportService.setGraphUsers(graphUsers as User[]);
        this.reportService.setHeader(this.header);
        this.categoryService.setCategories(categories);
        this.reportService.setBaselines(baselines);
        this.reportService.createTopAlerts(this.topAlerts);
        this.reportService.setAllBaselineCurrentPostureCount({ tenant_count: { has_deviated: 5, not_deviated: 11 }, group_count: { has_deviated: 3, not_deviated: 4 } });
        this.reportService.getBaselineDeviations(baseline_deviations);
        this.reportService.getTicketCount(ticket_counts)

    }


}
