import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerApplyService {
    constructor(private http: CommonHttpService<Company>) { }
    getAllCompany() {
        return this.http.gets(URL_ADMIN.GET_ALL_COMPANY, this.http.createHeader()).toPromise();
    }
    getApplyPage(body: any): Promise<any> {
        return this.http.post(URL_ADMIN.GET_PAGE_APLLY, body, this.http.createHeader()).toPromise();
    }
    getApply(accountId: number, jobId: number): Promise<Apply> {
        return this.http.getTwoId<Apply>(URL_ADMIN.INFO_APLLY, accountId, jobId, this.http.createHeader()).toPromise();
    }
    deleteApply(accountId: number, jobId: number) {
        return this.http.deleteTwoId(URL_ADMIN.DETELE_APLLY, accountId, jobId, this.http.createHeader()).toPromise();
    }
}
