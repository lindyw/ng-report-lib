import { NgModule } from '@angular/core';
import { NgOctReportComponent } from './ng-oct-report.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TopThreatsComponent } from './top-threats/top-threats.component';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { BoxListComponent } from './top-threats/box-list/box-list.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SecurityControlComponent } from './security-control/security-control.component';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        NgOctReportComponent,
        HeaderComponent,
        TopThreatsComponent,
        BoxListComponent,
        TimelineComponent,
        SecurityControlComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        HttpClientModule
    ],
    exports: [
        NgOctReportComponent,
        TimelineComponent
    ]
})
export class NgOctReportModule {

    iconList = ['info-square', 'mailbox-rules'];

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    ) {
        this.iconsRegister(this.matIconRegistry, this.domSanitizer);
    }

    iconsRegister(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        this.iconList.forEach((iconName) => {
            iconRegistry.addSvgIcon(
                iconName,
                sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/' + iconName + '.svg'));
        });
    }
}


