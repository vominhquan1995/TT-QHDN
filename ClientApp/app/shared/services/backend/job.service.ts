import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonHttpService } from '@services/backend/common-http.service';
import { LoadingService } from '@services/frontend/loading.service';
import { AlertService } from '@services/frontend/alert.service';
import { URL, STATUS } from '@services/service.variables';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { HttpHeaders } from '@angular/common/http';
import { URL_ADMIN } from "@app/admin/service/variables";

@Injectable()
export class JobService {
    private readonly URL = URL.JOB_URL;
    private readonly OJOB_URL = URL.JOB_URL + '/only-jobs'
    private readonly OINTERN_URL = URL.JOB_URL + '/only-interns'
    private readonly URL_APPLIES = '/api/applies/user-applies-job'
    constructor(private http: CommonHttpService<Job>) { }
    private getJobs$: Observable<Job[]>
    getJobsOfUser(userId: number): Observable<Job[]> {
        return this.http.gets<Job>(this.URL + `${userId}/user-jobs`).map(com => {
            return com.filter(f => f.status.toUpperCase() == STATUS.ACTIVE);
        }).share()
    }
    getJobDetail(id: number) {
        return this.http.get<Job>(this.URL, id, this.http.createHeader()).share()
    }
    getHotJobs() {
        return this.http.gets<Job>(this.URL + "/hot-jobs", this.http.createHeader()).share()
    }
    getHotInterns() {
        return this.http.gets<Job>(this.URL + "/hot-interns", this.http.createHeader()).share()
    }
    getSearchJobs(keyword: string, jobGroupId: number = 0, workTypeId: number = 0) {
        return this.http.gets<Job>(this.URL + `/search-job?keyword=${keyword || ""}&jobGroupId=${jobGroupId}&workTypeId=${workTypeId}`);
    }
    getSearchJobsHot(jobGroupId: number = 0){
        return this.http.gets<Job>(this.URL+`/search-job-hot?jobGroupId=${jobGroupId}`);
    }
    getOnlyJobs(page: number) {
        return this.http.get<any>(this.OJOB_URL, `${page - 1}`, this.http.createHeader())
    }
    getOnlyInterns(page: number) {
        return this.http.get<any>(this.OINTERN_URL, `${page - 1}`, this.http.createHeader())
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
    getJob(id: number) {
        return this.http.get(URL_ADMIN.INFO_JOB, id, this.http.createHeader()).toPromise();
    }
    updateJob(id: number, body: any) {
        return this.http.put(URL_ADMIN.UPDATE_JOB, id, body, this.http.createHeader()).toPromise();
    }
    getCvOfJob(id: number) {
        return this.http.gets<Account>(this.URL_APPLIES + `/${id}`, this.http.createHeader()).share()
    }
}