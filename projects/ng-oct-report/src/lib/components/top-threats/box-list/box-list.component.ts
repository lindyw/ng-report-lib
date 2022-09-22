import { Component, Input, OnInit } from '@angular/core';
import { CurrentPostureCount } from '../../../interfaces/ng-oct-report.interface';

@Component({
    selector: 'lib-box-list',
    templateUrl: './box-list.component.html',
    styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit {

    @Input() title: string = '';
    @Input() arrayList: Array<any> = [];
    @Input() currentList: Array<any> | null = [];
    @Input() tenant_posture_counts: CurrentPostureCount | null = { has_deviated: 0, not_deviated: 0 };
    @Input() group_posture_counts: CurrentPostureCount | null = { has_deviated: 0, not_deviated: 0 };
    @Input() keys: string[] = ['timestamp', 'actor', 'description'];
    @Input() type: string = 'events'; // event, baseline deviation, rule

    groupedArrayListBySeverity: { [key: string]: Array<any> } = {};

    constructor() { }

    ngOnInit(): void {
        this.summarizeBySeverity();
    }

    summarizeBySeverity() {
        let severities = [... new Set(this.arrayList.map(x => x.severity))];
        for (var severity of severities) {
            this.groupedArrayListBySeverity[severity] = this.arrayList.filter(a => a.severity === severity);
        }
    }

}
