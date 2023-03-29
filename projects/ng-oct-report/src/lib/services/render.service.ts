import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RenderService {

    public isRendered$ = new BehaviorSubject<boolean>(false);

    /**
     * update rendered status
     * @param {boolean} status - is report fully rendered ?
     * @todo need to check all child components instead of 'posture-line-chart' only
     */
    public set(status: boolean) {
        this.isRendered$.next(status);
    }
}
