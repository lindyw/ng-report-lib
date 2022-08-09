import { Component, Input, OnInit } from '@angular/core';
import { TopAlert, TopBaseline } from '../ng-oct-report.interface';

@Component({
  selector: 'lib-top-threats',
  templateUrl: './top-threats.component.html',
  styleUrls: ['./top-threats.component.scss']
})
export class TopThreatsComponent implements OnInit {

  @Input() title = '';
  @Input() alerts: TopAlert[] | null = [];
  @Input() baselines: TopBaseline[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
