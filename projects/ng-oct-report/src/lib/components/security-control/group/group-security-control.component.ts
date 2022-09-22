import { Component, Input } from '@angular/core';
import { GroupBaselineDeviation } from '../../../interfaces/ng-oct-report.interface';

@Component({
    selector: 'lib-group-security-control',
    templateUrl: './group-security-control.component.html',
    styleUrls: ['./group-security-control.component.scss']
})
export class GroupSecurityControlComponent {

    @Input() category = '';
    @Input() timelineElements = [];

    @Input() baselines: GroupBaselineDeviation = {}

    constructor() {
    }

    public hasDeviation(value: any) {
        return Object.values(value).length > 0;
    }

}
