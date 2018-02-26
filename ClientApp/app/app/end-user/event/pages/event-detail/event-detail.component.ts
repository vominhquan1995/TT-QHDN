import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '@services/backend/event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hure-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.sub$!.unsubscribe(); this.subRe$!.unsubscribe();
  }

  constructor(private route: ActivatedRoute, private eventSvc: EventService) { }
  sub$: Subscription;
  subRe$: Subscription;
  event: EventItem;
  relatedEvents: EventItem[]
  ngOnInit() {
    this.route.params.subscribe(param => {
      let eventId = +param['id']
      this.getDataAsync(eventId);
      this.getRelatedEvents(eventId);
    })
  }
  getDataAsync(eventId: number) {
    this.sub$ = this.eventSvc.getEvent(eventId).subscribe(res => {
      this.event = res;
    })
  }
  getRelatedEvents(eventId: number) {
    this.subRe$ = this.eventSvc.getRelatedEvents(eventId).subscribe(res => this.relatedEvents = res);
  }
  goTo(link: string) {
    window.open(link, "_blank");
  }
}
