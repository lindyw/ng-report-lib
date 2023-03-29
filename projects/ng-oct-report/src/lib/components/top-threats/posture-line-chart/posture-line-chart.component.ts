import { AfterViewInit, Component, Input, OnInit, ViewChildren } from '@angular/core';
import { NullableOption } from '@microsoft/microsoft-graph-types-beta';
import { Chart, registerables } from 'chart.js';
import { BaselinePostureCountsByDate } from '../../../interfaces/ng-oct-report.interface';
import { RenderService } from '../../../services/render.service';
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
        this.dates = Object.keys(data);
        this.deviating_controls = Object.values(data).map(data => data.deviating);
        this.compliant_controls = Object.values(data).map(data => data.compliant);
        this.monitored_controls = Object.values(data).map(data => data.monitored);
        console.log('compliant controls', this.compliant_controls);
        console.log('monitoring controls', this.monitored_controls);
        
        this.charts.push({
            id: this.title,
            chart: []
        })

        this.renderService.set(true);

    }
    private dates: string[] = [];
    private deviating_controls: number[] = [];
    private compliant_controls: NullableOption<number>[] = [];
    private monitored_controls: NullableOption<number>[] = [];

    constructor(
        private renderService: RenderService
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            let canvasCharts = this.allMyCanvas._results;  // Get array with all canvas
            canvasCharts.map((myCanvas: any, i: number) => {   // For each canvas, save the chart on the charts array 
                this.charts[i].chart = this.createChart(myCanvas.nativeElement.getContext('2d'), this.title)
            })
        }, 0);
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
                        borderColor: 'rgba(255,0,0,1)',
                        backgroundColor: 'rgba(255,0,0,1)',
                        pointBackgroundColor: 'rgba(255,0,0,1)',
                        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
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
                        pointBackgroundColor: 'limegreen',
                        pointHoverBackgroundColor: 'limegreen',
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
                        pointBackgroundColor: 'blue',
                        pointHoverBackgroundColor: 'blue',
                        tension: 0.1,
                        pointRadius: 2
                    }
                ]
            },
            options: {
                aspectRatio: 2.5,
                animation: {
                    duration: 0
                },
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
