import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, empty } from 'rxjs';
import { Baseline, Category, Header, TopAlert, TopBaseline } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';

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
    alerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    topBaselines$ = new BehaviorSubject<TopBaseline[] | null>(null);
    baselines$ = new BehaviorSubject<Baseline[] | null>(null);
    categories$ = new BehaviorSubject<Category[]>([]);

    catagories: string[] = [];

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.loadHeader();
        this.loadCategories();
        this.loadTopAlerts();
        this.loadTopBaselines();
        this.loadBaselines();

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
            this.header$.next(header);
        });
    }

    loadTopAlerts() {
        this.reportService.topAlerts$
            .subscribe(alerts => this.alerts$.next(alerts));
    }

    loadTopBaselines() {
        this.reportService.topBaselines$
            .subscribe(baselines => { this.topBaselines$.next(baselines) })
    }

    loadBaselines() {
        this.reportService.Baselines$
            .subscribe(baselines => {
                this.baselines$.next(baselines);
            })
    }

    loadCategories() {
        this.reportService.Categories$
            .subscribe(categories => {
                this.categories$.next(categories!);
                const categories_set = [... new Set(categories?.map(c => c.category))];
                this.catagories = categories_set;
            })
    }

    public baselinesByCategory(category: string) {
        let baselines = this.baselines$.getValue();
        if (!baselines) {
            return [];
        }
        else {
            let found_baselines = baselines.filter(b => b.category === category);
            let categories = this.categories$.getValue();
            let category_with_baseline_names = categories.filter(c => c.category === category);
            let empty_baselines_by_category = category_with_baseline_names.filter(function (c) {
                return found_baselines.find(b => b.name === c.name) === undefined
            })

            let baselinesByCategory = [...found_baselines];
            for (var b of empty_baselines_by_category) {
                baselinesByCategory.push({
                    ...b,
                    timelineElements: []
                })
            }
            return baselinesByCategory
        }
    }

}
