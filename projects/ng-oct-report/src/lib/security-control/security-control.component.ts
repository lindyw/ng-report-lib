import { Component, Input, OnInit } from '@angular/core';
import { Baseline } from '../ng-oct-report.interface';

@Component({
    selector: 'lib-security-control',
    templateUrl: './security-control.component.html',
    styleUrls: ['./security-control.component.scss']
})
export class SecurityControlComponent implements OnInit {

    @Input() baselines: Baseline[] = [];
    @Input() category = '';
    @Input() timelineElements = [];

    constructor() { }

    ngOnInit(): void {
    }

    public hasDeviation(baseline: Baseline) {
        return baseline.timelineElements.some(el => el.status === 'deviation');
    }

}
