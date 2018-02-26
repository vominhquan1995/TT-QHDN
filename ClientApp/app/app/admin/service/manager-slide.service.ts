import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerSlideService {
    constructor(private http: CommonHttpService<WorkType>) { }
    gets(): Promise<any> {
        return this.http.gets<Slide>(URL_ADMIN.GET_SLIDES, this.http.createHeader()).toPromise();
    }
    createSlide(body: any) {
        return this.http.post(URL_ADMIN.CREATE_SLIDE, body, this.http.createHeader()).toPromise();
    }
    getSlide(id: number): Promise<Company> {
        return this.http.get<Company>(URL_ADMIN.INFO_SLIDE, id, this.http.createHeader()).toPromise();
    }
    updateSlide(id: number, body: any) {
        return this.http.put(URL_ADMIN.UPDATE_SLIDE, id, body, this.http.createHeader()).toPromise();
    }
    deleteSlide(id: number) {
        return this.http.delete(URL_ADMIN.DETELE_SLIDE, id, this.http.createHeader()).toPromise();
    }
}
