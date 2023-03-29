import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Header } from '../../interfaces/ng-oct-report.interface';

function dateFormat(a: string) {
  return DateTime.fromISO(a, { zone: 'utc' }).toFormat('ccc, LLL dd yyyy');
}
@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public header: any = null;

  @Input() set data(data: Header | null) {
    if (!!data) {
      this.header = {
        ...data,
        date: {
          start: dateFormat(data.date.start),
          end: dateFormat(data.date.end)
        }
      }
    }
  }
  // @Input() data: { date: { start: string, end: string }, tenant: string, icon?: string } | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
