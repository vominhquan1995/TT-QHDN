import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerEventService {
    constructor(private http: CommonHttpService<EventItem>) { }
    getEventPage(body: any): Promise<{ total: number, data: EventItem[] }> {
        return this.http.post(URL_ADMIN.GET_PAGE_EVENT, body, this.http.createHeader()).toPromise();
    }
    createEvent(body: any) {
        return this.http.post(URL_ADMIN.CREATE_EVENT, body, this.http.createHeader()).toPromise();
    }
    getEvent(id: number): Promise<EventItem> {
        return this.http.get<EventItem>(URL_ADMIN.INFO_EVENT, id, this.http.createHeader()).toPromise();
    }
    updateEvent(id: number, body: any) {
        return this.http.put(URL_ADMIN.UPDATE_EVENT, id, body, this.http.createHeader()).toPromise();
    }
    deleteEvent(id: number) {
        return this.http.delete(URL_ADMIN.DETELE_EVENT, id, this.http.createHeader()).toPromise();
    }
}
