import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, empty, filter, map, timestamp } from 'rxjs';
import { Baseline, Category, Header, TopAlert, TopBaseline, TopUser } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';
import { DateTime } from 'luxon';

function dateFormat(a: string) {
    return DateTime.fromISO(a).toFormat('ccc, LLL dd yyyy');
}

function groupBy(arr: Array<any>, key: string) {
    return arr.reduce((acc, obj) => {
        const _key = obj[key];
        if (!acc[_key]) {
            acc[_key] = [];
        }
        acc[_key].push(obj);
        return acc;
    }, {});
}

@Component({
    selector: 'ng-oct-report',
    templateUrl: './ng-oct-report.component.html',
    styleUrls: ['./ng-oct-report.component.scss']
})
export class NgOctReportComponent implements OnInit {

    header$ = new BehaviorSubject<Header | null>(null);
    alerts$ = new BehaviorSubject<TopAlert[] | null>(null);
    alertsByUsers$ = new BehaviorSubject<TopUser[] | null>(null);
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
            .subscribe(alerts => {
                let alertsByUsers = [];
                if (!!alerts) {
                    alerts = alerts.map(a => ({ ...a, timestamp: new Date(a.timestamp).toString() }))
                    alertsByUsers = groupBy(alerts.filter(a => !!a.actor), 'actor');
                }
                this.alerts$.next(alerts);
                this.alertsByUsers$.next(alertsByUsers);
            })

    }

    loadTopBaselines() {
        this.reportService.topBaselines$
            .subscribe(baselines => {
                if (!!baselines) {
                    baselines = baselines.map(b => ({ ...b, timestamp: new Date(b.timestamp).toString() }))
                }
                this.topBaselines$.next(baselines)
            })
    }

    loadBaselines() {
        this.reportService.Baselines$
            .subscribe(baselines => {
                this.baselines$.next(baselines);
            })
    }

    loadCategories() {
        this.reportService.Categories$
        .pipe(
            filter(categories => !!categories)
        )
            .subscribe(categories => {
                this.categories$.next(categories!);
                const categories_set = [... new Set(categories?.map(c => c.category))];
                categories_set.push('Others');
                this.catagories = categories_set;
            })
    }

    public baselinesByCategory(category: string) {
        let baselines = this.baselines$.getValue();
        if (!baselines) {
            return [];
        }
        else {
            let found_baselines = category === 'Others' ? baselines.filter(b => b.category === null) : baselines.filter(b => b.category === category);
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
