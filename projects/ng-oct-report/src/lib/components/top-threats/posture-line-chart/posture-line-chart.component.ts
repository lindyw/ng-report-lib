import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BaselinePostureCountsByDate } from '../../../interfaces/ng-oct-report.interface';
Chart.register(...registerables);
@Component({
    selector: 'lib-posture-line-chart',
    templateUrl: './posture-line-chart.component.html',
    styleUrls: ['./posture-line-chart.component.scss']
})
export class PostureLineChartComponent implements OnInit {

    @Input() set postureData(data: BaselinePostureCountsByDate) {
        console.log(data)
        this.dates = Object.keys(data);
        this.deviating_controls = Object.values(data).map(data => data.deviating);
        this.compliant_controls = Object.values(data).map(data => data.compliant);
        this.monitored_controls = Object.values(data).map(data => data.monitored); 
        this.createChart();
    }
    public chart: any;
    private dates: string[] = [];
    private deviating_controls: number[] = [];
    private compliant_controls: number[] = [];
    private monitored_controls: number[] = [];

    constructor() { }

    ngOnInit(): void {
       
    }

    createChart() {
        this.chart = new Chart("lineChart", {
            type: 'line',

            data: {// values on X-Axis
                labels: this.dates,
                datasets: [
                    {
                        label: "Deviating Controls",
                        data: this.deviating_controls,
                        backgroundColor: 'red'
                    },
                    {
                        label: "Compliant Controls",
                        data: this.compliant_controls,
                        backgroundColor: 'limegreen'
                    },
                    {
                        label: "Monitored Controls",
                        data: this.monitored_controls,
                        backgroundColor: 'blue'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5,
                plugins: {
                    title: {
                        display: true,
                        text: 'Tenant Baselines Posture Summary Chart'
                    }
                }
            }

        });
    }

}
