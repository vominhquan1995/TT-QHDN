import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/backend/common-http.service';
import { URL } from '@services/service.variables';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobGroupService {
    private readonly URL = URL.JOB_GROUP_URL;
    constructor(private http: CommonHttpService<JobGroup>) { }
    private getJobG$: Observable<JobGroup[]>
    getJobs(): Observable<JobGroup[]> {
        if (!this.getJobG$) {
            this.getJobG$ = this.http.gets<JobGroup>(this.URL, this.http.createHeader()).share();
        }
        return this.getJobG$;
    }
}