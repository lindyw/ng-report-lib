import { Component, Input, OnInit } from '@angular/core';
import { BaselinePostureCountsByDate, CurrentPostureCount } from '../../../interfaces/ng-oct-report.interface';


@Component({
    selector: 'lib-box-list',
    templateUrl: './box-list.component.html',
    styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit {

    @Input() title: string = '';
    @Input() arrayList: Array<any> = [];
    @Input() currentList: Array<any> | null = [];
    @Input() tenant_posture_counts: CurrentPostureCount | null = { has_deviated: 0, not_deviated: 0 };
    @Input() group_posture_counts: CurrentPostureCount | null = { has_deviated: 0, not_deviated: 0 };
    @Input() open_ticket_count: number | null = 0;
    @Input() created_ticket_count: number | null = 0;
    @Input() resolved_ticket_count: number | null = 0;
    @Input() keys: string[] = ['timestamp', 'actor', 'description'];
    @Input() type: string = 'event'; // event, ticket, baseline deviation, rule

    @Input() tenant_baselines_posture_controls_in_this_period: BaselinePostureCountsByDate | null = {};
    @Input() group_baselines_posture_controls_in_this_period: BaselinePostureCountsByDate | null = {};

    groupedArrayListBySeverity: { [key: string]: Array<any> } = {};
    event_occurence_by_countries: any[] = [];
    geos: string[] = [];

    constructor(
    ) { }

    ngOnInit(): void {
        this.summarizeBySeverity();
        if (this.type === 'event') {
            this.geos = this.GetGeoFromAlerts();
        }
        if (this.title === 'Alerts') {
            this.GetGeoUsersFromAlerts();
        }
    }

    summarizeBySeverity() {
        let severities = [... new Set(this.arrayList.map(x => x.severity))];
        for (var severity of severities) {
            this.groupedArrayListBySeverity[severity] = this.arrayList
                .filter(a => a.severity === severity);
        }
    }

    GetGeoFromAlerts() {
        const unique_countries = this.arrayList
            .map(a => a.country)
            .filter((c, i, arr) => arr.indexOf(c) === i && !!c && c !== 'N/A');

        for (var country of unique_countries) {
            const country_event_ocurrence = this.arrayList.reduce((arr, alert) => {
                if (country === alert.country) {
                    if (!arr.hasOwnProperty(country)) {
                        arr[country] = 1;
                    } else {
                        arr[country]++;
                    }
                }
                return arr;
            }, {})
            this.event_occurence_by_countries.push(country_event_ocurrence);

        }

        return unique_countries;
    }

    GetGeoUsersFromAlerts() {
        for (let geo of this.geos) {
            const event_users_in_country = this.arrayList
                .filter(a => a.country === geo)
                .map(a =>
                ({
                    country: a.country,
                    user: a.actor
                }))
                .reduce((arr: any, alert) => {
                    if (arr.length === 0) {
                        arr = [alert.user];
                    } else if (!arr.includes(alert.user)) {
                        arr.push(alert.user);
                    }
                    return arr;
                }, [])
            const found_index = this.event_occurence_by_countries.findIndex(el => Object.keys(el)[0] === geo);
            this.event_occurence_by_countries[found_index].users = event_users_in_country;
        }

    }

    public showUserOrCountByGeo(users: string[]) {
        if (!users) {
            return;
        }
        if (users.length > 1) {
            return `from ${users.length} users`;
        } else if (users.length === 1) {
            return `from ${users[0]}`;
        } else {
            return ``;
        }
    }

    public getEntries(obj: any): any {
        return Object.entries(obj)[0];
    }

    public checkRows() {
        return this.geos.length > 0 ? 2 : 1;
    }
}
