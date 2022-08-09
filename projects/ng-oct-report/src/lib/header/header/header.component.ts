import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() data: { date: { start: string, end: string }, tenant: string } | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
