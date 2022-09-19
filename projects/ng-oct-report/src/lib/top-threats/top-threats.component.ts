import { Component, Input, OnInit } from '@angular/core';
import { CurrentPostureCount, TopAlert, TopBaselineDeviation, TopUser } from '../ng-oct-report.interface';

@Component({
  selector: 'lib-top-threats',
  templateUrl: './top-threats.component.html',
  styleUrls: ['./top-threats.component.scss']
})
export class TopThreatsComponent implements OnInit {

  @Input() title = '';
  @Input() alerts: TopAlert[] | null = null;
  @Input() alertsByUsers: TopUser[] | null = null;
  @Input() baselines: TopBaselineDeviation[] | null = null;
  @Input() all_posture_count: { tenant_count: CurrentPostureCount, group_count: CurrentPostureCount } | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  userAlerts(items: any) {
    return items;
  }

}
