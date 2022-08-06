import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOctReportModule } from 'projects/ng-oct-report/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgOctReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
