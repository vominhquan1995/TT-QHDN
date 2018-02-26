import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerWorkTypeService {
    constructor(private http: CommonHttpService<WorkType>) { }
    getWorkTypePage(body: any): Promise<any> {
        return this.http.post(URL_ADMIN.GET_PAGE_WORK_TYPE, body, this.http.createHeader()).toPromise();
    }
    createWorkType(body: any) {
        return this.http.post(URL_ADMIN.CREATE_WORK_TYPE, body, this.http.createHeader()).toPromise();
    }
    getWorkType(id: number) {
        return this.http.get(URL_ADMIN.INFO_WORK_TYPE, id, this.http.createHeader()).toPromise();
    }
    updateWorkType(id: number, body: any) {
        return this.http.put(URL_ADMIN.UPDATE_WORK_TYPE, id, body, this.http.createHeader()).toPromise();
    }
    deleteWorkType(id: number) {
        return this.http.delete(URL_ADMIN.DETELE_WORK_TYPE, id, this.http.createHeader()).toPromise();
    }
}
