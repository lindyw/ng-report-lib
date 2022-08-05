import { NgModule } from '@angular/core';
import { NgOctReportComponent } from './ng-oct-report.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    NgOctReportComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    NgOctReportComponent
  ]
})
export class NgOctReportModule { }
