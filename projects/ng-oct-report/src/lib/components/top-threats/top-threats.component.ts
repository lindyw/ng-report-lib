import { Component, Input, OnInit } from '@angular/core';
import { BaselinePostureCountsByDate, CurrentPostureCount, TopAlert, TopBaselineDeviation, TopUser } from '../../interfaces/ng-oct-report.interface';

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
  @Input() tenant_posture_controls_in_this_period: BaselinePostureCountsByDate | null = null;
  @Input() group_posture_controls_in_this_period: BaselinePostureCountsByDate | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  userAlerts(items: any) {
    return items;
  }

}
