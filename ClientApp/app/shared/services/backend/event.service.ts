import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonHttpService } from '@services/backend/common-http.service';
import { LoadingService } from '@services/frontend/loading.service';
import { AlertService } from '@services/frontend/alert.service';
import { URL } from '@services/service.variables';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventService {
    private readonly URL = URL.EVENT_URL;
    headers = new HttpHeaders()
        .set("Content-Type", "application/json");
    constructor(private http: CommonHttpService<EventItem>) { }
    private getEvents$: Observable<EventItem[]>
    getEvents(): Observable<EventItem[]> {
        if (!this.getEvents$) {
            this.getEvents$ = this.http.gets<EventItem>(this.URL, this.http.createHeader()).share();
        }
        return this.getEvents$;
    }
    getEvent(id: number): Observable<EventItem> {
        return this.http.get(this.URL, id);
    }
    getEventsPage(currentPage: number, numberItemPage: number): Promise<any> {
        let body = {
            CurrentPage: currentPage,
            NumberItemPage: numberItemPage
        }
        return this.http.post(URL.EVENT_URL, body, this.http.createHeader()).toPromise();
    }
    getRelatedEvents(id: number):Observable<EventItem[]> {
        return this.http.gets(this.URL + `/${id}/related`);
    }
    getOpeningEvent(){
        return this.http.gets<EventItem>(this.URL+"/opening");
    }
}