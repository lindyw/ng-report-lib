import { Component, Input, OnInit } from '@angular/core';
import { GroupBaselineDeviation } from '../../../interfaces/ng-oct-report.interface';

@Component({
    selector: 'lib-group-security-control',
    templateUrl: './group-security-control.component.html',
    styleUrls: ['./group-security-control.component.scss']
})
export class GroupSecurityControlComponent implements OnInit {

    @Input() category = '';
    @Input() timelineElements = [];

    @Input() baselines: GroupBaselineDeviation = {}

    constructor() {
    }

    ngOnInit() {
        console.log('timeline el', this.baselines)
    }

    public hasDeviation(value: any) {
        return Object.values(value).length > 0;
    }

}
