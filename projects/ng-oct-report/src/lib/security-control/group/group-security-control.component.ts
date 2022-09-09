import { Component, Input, OnInit } from '@angular/core';
import { BaselineDeviation } from '../../ng-oct-report.interface';

@Component({
    selector: 'lib-group-security-control',
    templateUrl: './group-security-control.component.html',
    styleUrls: ['./group-security-control.component.scss']
})
export class GroupSecurityControlComponent {

    @Input() category = '';
    @Input() timelineElements = [];

    @Input() baselines: {
        [b_name: string]: {
            [g_name: string]: {
                [user_name: string]: BaselineDeviation[]
            }
        }
    } = {}

    constructor() {
        console.log('group baselines', this.baselines)
    }

    public hasDeviation(value: any) {
        return Object.values(value).length > 0;
    }

}
