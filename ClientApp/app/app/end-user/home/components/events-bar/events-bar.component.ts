import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '@services/backend/event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hure-events-bar',
  templateUrl: './events-bar.component.html',
  styleUrls: ['./events-bar.component.scss']
})
export class EventsBarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subRe$!.unsubscribe();
  }
  subRe$:Subscription
  constructor(private eventSvc:EventService) { }
  relatedEvents:EventItem[]
  ngOnInit() {
    this.getRelatedEvents();
  }
  getRelatedEvents(){
    this.subRe$ =  this.eventSvc.getOpeningEvent().subscribe(res=>this.relatedEvents=res);
  }
}
