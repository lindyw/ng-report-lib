import { Component, Input, OnInit } from '@angular/core';
import { Baseline } from '../ng-oct-report.interface';
import { groupBy } from '../utils';

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
        if (this.category === 'Group Baselines') {
            console.log('group baselines', this.baselines);
        
            if (this.baselines.length > 0){ 
                console.log('grouped By Name', groupBy(this.baselines, 'name'));
            }
        }
       
    }

    public hasDeviation(baseline: Baseline) {
        return baseline.timelineElements.some(el => el.status === 'deviation');
    }

}
