import { NgModule } from '@angular/core';
import { NgOctReportComponent } from './ng-oct-report.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TopThreatsComponent } from './top-threats/top-threats.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { BoxListComponent } from './top-threats/box-list/box-list.component';
import { TimelineComponent } from './timeline/timeline.component';


@NgModule({
  declarations: [
    NgOctReportComponent,
    HeaderComponent,
    TopThreatsComponent,
    BoxListComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ],
  exports: [
    NgOctReportComponent,
    TimelineComponent
  ]
})
export class NgOctReportModule { }
