import { Component, Input, OnInit } from '@angular/core';
import { TopAlert, TopBaseline, TopUser } from '../ng-oct-report.interface';

@Component({
  selector: 'lib-top-threats',
  templateUrl: './top-threats.component.html',
  styleUrls: ['./top-threats.component.scss']
})
export class TopThreatsComponent implements OnInit {

  @Input() title = '';
  @Input() alerts: TopAlert[] | null = null;
  @Input() alertsByUsers: TopUser[] | null = null;
  @Input() baselines: TopBaseline[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  userAlerts(items :any) {
     return items;
  }

}
