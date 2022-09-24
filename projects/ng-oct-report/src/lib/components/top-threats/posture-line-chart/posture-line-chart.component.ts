import { AfterViewInit, Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BaselinePostureCountsByDate } from '../../../interfaces/ng-oct-report.interface';
Chart.register(...registerables);
@Component({
    selector: 'lib-posture-line-chart',
    templateUrl: './posture-line-chart.component.html',
    styleUrls: ['./posture-line-chart.component.scss']
})
export class PostureLineChartComponent implements OnInit, AfterViewInit {
    @ViewChildren('lineCharts') allMyCanvas: any;  // Observe #lineCharts elements
    public charts: any = [];    // Array to store all line charts
    @Input() title: string = '';
    @Input() set postureData(data: BaselinePostureCountsByDate) {
        console.log(data)
        this.dates = Object.keys(data);
        this.deviating_controls = Object.values(data).map(data => data.deviating);
        this.compliant_controls = Object.values(data).map(data => data.compliant);
        this.monitored_controls = Object.values(data).map(data => data.monitored);
        this.charts.push({
            id: this.title,
            chart: []
        })

    }
    private dates: string[] = [];
    private deviating_controls: number[] = [];
    private compliant_controls: number[] = [];
    private monitored_controls: number[] = [];

    constructor() { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        let canvasCharts = this.allMyCanvas._results;  // Get array with all canvas
        canvasCharts.map((myCanvas: any, i: number) => {   // For each canvas, save the chart on the charts array 
            this.charts[i].chart = this.createChart(myCanvas.nativeElement.getContext('2d'), this.title)
        })
    }

    createChart(id: string, title: string) {
        const chart = new Chart(id, {
            type: 'line',

            data: {// values on X-Axis
                labels: this.dates,
                datasets: [
                    {
                        label: "Deviating Controls",
                        fill: false,
                        data: this.deviating_controls,
                        borderWidth: 1,
                        borderColor: 'red',
                        backgroundColor: 'red',
                        tension: 0.1,
                        pointRadius: 2
                    },
                    {
                        label: "Compliant Controls",
                        fill: false,
                        data: this.compliant_controls,
                        borderWidth: 1,
                        borderColor: 'limegreen',
                        backgroundColor: 'limegreen',
                        tension: 0.1,
                        pointRadius: 2
                    },
                    {
                        label: "Monitored Controls",
                        fill: false,
                        data: this.monitored_controls,
                        borderWidth: 1,
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        tension: 0.1,
                        pointRadius: 2
                    }
                ]
            },
            options: {
                aspectRatio: 2.5,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    }
                }
            }

        });
        return chart;
    }

}
