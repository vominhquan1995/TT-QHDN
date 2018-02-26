import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventService } from '@services/backend/event.service';
import { share } from 'rxjs/operators';
import { LoadingComponent } from "@core/loading/loading.component";

@Component({
    selector: 'hure-event-page',
    templateUrl: 'event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})

export class EventPageComponent {
    private currentPage: number = 1;
    private totalItem: number = 7;
    private numberItemPage: number = 1;
    private numberPageView: number = 5;
    private _data: any;
    
    constructor(private _serviceEvent:EventService) { }
    ngOnInit() {
        // this.getData();
    }
    // getData() {
    //     this._data = undefined;
    //     this._serviceEvent.getEventsPage(this.currentPage, this.numberItemPage).then(data => {
    //         this._data = data.data;
    //         this.totalItem = data.total;
    //     })
    // }
    // pageChange() {
    //     this.getData();
    // }

}