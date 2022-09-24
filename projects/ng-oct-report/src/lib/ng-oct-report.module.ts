import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgOctReportComponent } from './components/ng-oct-report.component';
import { TopThreatsComponent } from './components/top-threats/top-threats.component';
import { BoxListComponent } from './components/top-threats/box-list/box-list.component';
import { TimelineComponent  } from './components/timeline/timeline.component';

import { TenantSecurityControlComponent } from './components/security-control/tenant/tenant-security-control.component';
import { GroupSecurityControlComponent } from './components/security-control/group/group-security-control.component';
import { PostureLineChartComponent } from './components/top-threats/posture-line-chart/posture-line-chart.component';


@NgModule({
    declarations: [
        NgOctReportComponent,
        HeaderComponent,
        TopThreatsComponent,
        BoxListComponent,
        TimelineComponent,
        TenantSecurityControlComponent,
        GroupSecurityControlComponent,
        PostureLineChartComponent
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


