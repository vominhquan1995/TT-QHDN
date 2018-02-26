import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
    selector: 'hure-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss'],

})
export class EventCardComponent implements OnInit {
    ngOnInit(): void {
        if (!moment(this.event.endTime).isAfter(new Date())) {
            this.status = "Hết hạn";

        } else if (moment(this.event.startTime).isAfter(new Date())) {
            this.status = "Sắp diễn ra";
        } else {
            this.status = "Đang diễn ra";
        }
    }
    status: string;
    currentDate = new Date()
    constructor(private router: Router) { }
    @Input() event: EventItem;
    goToDetail() {
        if (this.event) {
            this.router.navigate(['events', 'detail', this.event.id.toString()]);
        }
    }
}