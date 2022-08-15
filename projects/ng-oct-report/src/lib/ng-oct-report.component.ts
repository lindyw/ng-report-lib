import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Baseline, Header, TopAlert, TopBaseline } from './ng-oct-report.interface';
import { NgOctReportService } from './ng-oct-report.service';
import moment from 'moment';

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

    catagories: string[] = [];

    constructor(private reportService: NgOctReportService) { }

    ngOnInit(): void {
        this.loadHeader();
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
            .subscribe(baselines => this.topBaselines$.next(baselines))
    }

    loadBaselines() {
        this.reportService.Baselines$
            .subscribe(baselines => {
                this.baselines$.next(baselines);
                this.catagories = !!baselines ? [... new Set(baselines.map(b => b.category))] : [];
            })
    }

    public baselinesByCategory(category: string) {
        let baselines = this.baselines$.getValue();
        if (!baselines) {
            return [];
        }
        else {
            return baselines.filter(b => b.category === category);
        }
    }

}
