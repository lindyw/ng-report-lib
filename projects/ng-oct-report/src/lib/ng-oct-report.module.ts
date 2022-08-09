import { NgModule } from '@angular/core';
import { NgOctReportComponent } from './ng-oct-report.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header/header.component';


@NgModule({
  declarations: [
    NgOctReportComponent,
    HeaderComponent
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
