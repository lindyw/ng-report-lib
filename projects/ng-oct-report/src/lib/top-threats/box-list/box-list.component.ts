import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'lib-box-list',
    templateUrl: './box-list.component.html',
    styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit {

    @Input() title: string = '';
    @Input() arrayList: Array<any> = [];
    @Input() keys: string[] = ['timestamp', 'actor', 'description'];
    @Input() type: string = 'events'; // event, baseline deviation, rule

    groupedArrayListBySeverity: { [key: string]: Array<any> } = {};

    constructor() { }

    ngOnInit(): void {
      this.summarizeBySeverity();
    }

    summarizeBySeverity() {
        let severities = [... new Set(this.arrayList.map(x => x.severity))];
        console.log('severities', severities)
        for (var severity of severities) {
            this.groupedArrayListBySeverity[severity] = this.arrayList.filter(a => a.severity === severity);
        }
    }

}
