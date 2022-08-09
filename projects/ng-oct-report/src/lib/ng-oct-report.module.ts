import { NgModule } from '@angular/core';
import { NgOctReportComponent } from './ng-oct-report.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { TopThreatsComponent } from './top-threats/top-threats.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoxListComponent } from './top-threats/box-list/box-list.component';


@NgModule({
  declarations: [
    NgOctReportComponent,
    HeaderComponent,
    TopThreatsComponent,
    BoxListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatListModule,
 
  ],
  exports: [
    NgOctReportComponent
  ]
})
export class NgOctReportModule { }
