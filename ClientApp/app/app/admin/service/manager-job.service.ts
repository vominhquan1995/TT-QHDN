import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerJobService {
    constructor(private http: CommonHttpService<Account>) { }
    getJobsPage(body: any): Promise<{ total: number, data: Job[] }> {
        return this.http.post(URL_ADMIN.GET_PAGE_JOB, body, this.http.createHeader()).toPromise();
    }
    getAllWorkType() {
        return this.http.gets(URL_ADMIN.GET_ALL_WORK_TYPE, this.http.createHeader()).toPromise();
    }
    getAllJobGroup() {
        return this.http.gets(URL_ADMIN.GET_ALL_JOb_GROUP, this.http.createHeader()).toPromise();
    }
    getAllCompany() {
        return this.http.gets(URL_ADMIN.GET_ALL_COMPANY, this.http.createHeader()).toPromise();
    }
    createJob(body: any) {
        return this.http.post(URL_ADMIN.CREATE_JOB, body, this.http.createHeader()).toPromise();
    }
    deleteJob(id: number) {
        return this.http.delete(URL_ADMIN.DETELE_JOB, id, this.http.createHeader()).toPromise();
    }
    getJob(guid: string) {
        return this.http.get(URL_ADMIN.INFO_JOB, guid, this.http.createHeader()).toPromise();
    }
    updateJob(id: number, body: any) {
        return this.http.put(URL_ADMIN.UPDATE_JOB, id, body, this.http.createHeader()).toPromise();
    }
    activate(id: number, body: any) {
        return this.http.put(URL_ADMIN.ACTIVATE_JOB, id, body, this.http.createHeader()).toPromise();
    }
}