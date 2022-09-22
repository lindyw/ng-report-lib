import { Component, Input } from '@angular/core';
import { BaselineDeviation } from '../../../interfaces/ng-oct-report.interface';

@Component({
    selector: 'lib-tenant-security-control',
    templateUrl: './tenant-security-control.component.html',
    styleUrls: ['./tenant-security-control.component.scss']
})
export class TenantSecurityControlComponent {

    @Input() baselines: BaselineDeviation[] = [];
    @Input() category = '';
    @Input() timelineElements = [];

    @Input() groupByBaselineName: {
        [b_name: string]: {
            [g_name: string]: {
                [user_name: string]: BaselineDeviation[]
            }
        }
    } = {}

    constructor() { }

    public hasDeviation(baseline: BaselineDeviation) {
        return baseline.timelineElements.some(el => el.status === 'deviation');
    }

}
