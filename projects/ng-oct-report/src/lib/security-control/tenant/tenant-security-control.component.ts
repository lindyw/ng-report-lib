import { Component, Input, OnInit } from '@angular/core';
import { Baseline } from '../../ng-oct-report.interface';

@Component({
    selector: 'lib-tenant-security-control',
    templateUrl: './tenant-security-control.component.html',
    styleUrls: ['./tenant-security-control.component.scss']
})
export class TenantSecurityControlComponent {

    @Input() baselines: Baseline[] = [];
    @Input() category = '';
    @Input() timelineElements = [];

    @Input() groupByBaselineName: {
        [b_name: string]: {
            [g_name: string]: {
                [user_name: string]: Baseline[]
            }
        }
    } = {}

    constructor() { }

    public hasDeviation(baseline: Baseline) {
        return baseline.timelineElements.some(el => el.status === 'deviation');
    }

}
