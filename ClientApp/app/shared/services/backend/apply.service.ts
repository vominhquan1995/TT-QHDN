import { Injectable } from '@angular/core';
import { URL } from '@services/service.variables';
import { CommonHttpService } from '@services/backend/common-http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApplyService {
    private readonly URL = URL.APPLY_URL;
    constructor(private http: CommonHttpService<Apply>) { }
    postApply(model: any) {
        return this.http.post(this.URL, model, this.http.createHeader());
    }
    getAppliesOfUser(userId: number): Observable<Job[]> {
        return this.http.gets(this.URL + `/${userId}/user-applies`)
    }
    updateStatus(id: number, body: any) {
        return this.http.put(this.URL + `/update-progress/`, id, body, this.http.createHeader()).toPromise();
    }
}