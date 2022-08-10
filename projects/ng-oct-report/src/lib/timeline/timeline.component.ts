import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimelineElement } from '../ng-oct-report.interface';

@Component({
    selector: 'ng-oct-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements AfterViewInit {


    @ViewChild('eventsWrapper')
    eventsWrapper!: ElementRef;
    @ViewChild('fillingLine')
    fillingLine!: ElementRef;
    @ViewChildren('timelineEvents')
    timelineEvents!: QueryList<ElementRef>;

    selectedIndex: number = 0;
    eventsWrapperWidth: number = 0;
    private _viewInitialized = false;

    private _timelineWrapperWidth = 800;//720;

    @Input() set timelineWrapperWidth(value: number) {
        this._timelineWrapperWidth = value;
        this._cdr.detectChanges();
    }

    private _eventsMinDistance: number = 20;//80;

    @Input() set eventMinDistance(value: number) {
        this._eventsMinDistance = value;
        this.initView();
    }

    private _timelineElements: TimelineElement[] = [
        {  date: new Date(2014, 1, 16), status: 'created' },
        { date: new Date(2014, 2, 28), status: 'deviation' },
        { date: new Date(2014, 3, 20), status: 'remediated' },
        { date: new Date(2014, 5, 20), status: 'deviation' },
        {  date: new Date(2014, 7, 9), status: 'deviation' },
        {  date: new Date(2014, 8, 30), status: 'deviation' },
        {  date: new Date(2014, 9, 15), status: 'remediated' },
        {  date: new Date(2014, 11, 1), status: 'deviation' },
        {  date: new Date(2014, 12, 10), status: 'remediated' },
        {  date: new Date(2015, 1, 19), status: 'deviation' },
        {  date: new Date(2015, 3, 3), status: 'remediated' },
    ];

    get timelineElements(): TimelineElement[] {
        return this._timelineElements;
    }

    @Input() set timelineElements(value: TimelineElement[]) {
        this._timelineElements = value;
        this.initView();
    }

    private _dateFormat: string = 'dd.MM.yyyy';

    get dateFormat(): string {
        return this._dateFormat;
    }

    @Input() set dateFormat(value: string) {
        this._dateFormat = value;
        this.initView();
    }

    private static pxToNumber(val: string): number {
        return Number(val.replace('px', ''));
    }

    private static getElementWidth(element: Element): number {
        const computedStyle = window.getComputedStyle(element);
        if (!computedStyle.width) {
            return 0;
        }
        return this.pxToNumber(computedStyle.width);
    }

    private static dayDiff(first: Date, second: Date): number {
        return Math.round(second.getTime() - first.getTime());
    }

    private static minLapse(elements: TimelineElement[]): number {
        if (elements && elements.length && elements.length === 1) {
            return 0;
        }

        let result: number = 0;
        for (let i = 1; i < elements.length; i++) {
            let distance = this.dayDiff(elements[i - 1].date, elements[i].date);
            result = result ? Math.min(result, distance) : distance;
        }
        return result;
    }

    setTimelineWidth(elements: TimelineElement[], width: number, eventsMinLapse: number) {
        let timeSpan = 100;
        if (elements.length > 1) {
            timeSpan = TimelineComponent.dayDiff(elements[0].date, elements[elements.length - 1].date);
        }
        let timeSpanNorm = timeSpan / eventsMinLapse;
        timeSpanNorm = Math.round(timeSpanNorm) + 4;
        this.eventsWrapperWidth = timeSpanNorm * width;
        // let aHref = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];
        // this.updateTimelinePosition(aHref);
        return this.eventsWrapperWidth;
    }

    constructor(private _cdr: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        this._cdr.detach();
        this._viewInitialized = true;
        this.initView();
    }

    private initView(): void {
        if (!this._viewInitialized) {
            return;
        }

        if (this._timelineElements && this._timelineElements.length) {
            this.initTimeline(this._timelineElements);
        }
        this._cdr.detectChanges();
    }

    initTimeline(timeLines: TimelineElement[]) {
        let eventsMinLapse = TimelineComponent.minLapse(timeLines);
        // assign a left position to the single events along the timeline
        this.setDatePosition(timeLines, this._eventsMinDistance, eventsMinLapse);
        // assign a width to the timeline
        this.setTimelineWidth(timeLines, this._eventsMinDistance, eventsMinLapse);
        // the timeline has been initialize - show it
        // this.loaded = true;
    }

    private setDatePosition(elements: TimelineElement[], min: number, eventsMinLapse: number) {
        let timelineEventsArray = this.timelineEvents.toArray();
        let i: number = 0;
        for (let component of elements) {
            let distance = TimelineComponent.dayDiff(elements[0].date, component.date);
            let distanceNorm = Math.round(distance / eventsMinLapse);
            timelineEventsArray[i].nativeElement.style.left = distanceNorm * min + 'px';
            // span
            let span: HTMLSpanElement = <HTMLSpanElement>timelineEventsArray[i].nativeElement.parentElement.children[1];
            let spanWidth = TimelineComponent.getElementWidth(span);
            span.style.left = distanceNorm * min + spanWidth / 2 + 'px';
            i++;
        }
    }
}
