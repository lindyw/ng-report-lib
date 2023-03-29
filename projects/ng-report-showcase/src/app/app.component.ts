import { Component, OnInit } from '@angular/core';
import { User } from '@microsoft/microsoft-graph-types-beta';
import { CategoryService } from 'projects/ng-oct-report/src/lib/services/category.service';
import { RenderService } from 'projects/ng-oct-report/src/lib/services/render.service';
import { NgOctReportService } from 'projects/ng-oct-report/src/public-api';
import { alerts } from './test-data/alerts.data';
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


    constructor(
        private reportService: NgOctReportService,
        private categoryService: CategoryService,
        private renderService: RenderService
    ) {

    }

    ngOnInit(): void {
        this.reportService.setGraphUsers(graphUsers as User[]);
        this.reportService.setHeader(this.header);
        this.categoryService.setCategories(categories);
        this.reportService.setBaselines(baselines);
        this.reportService.createTopAlerts(alerts);
        this.reportService.setAllBaselineCurrentPostureCount({ tenant_count: { has_deviated: 5, not_deviated: 11 }, group_count: { has_deviated: 3, not_deviated: 4 } });
        this.reportService.getBaselineDeviations(baseline_deviations);
        this.reportService.getTicketCount(ticket_counts);

        this.renderService.isRendered$.subscribe(rendered => console.log('rendered? ', rendered));

    }


}
