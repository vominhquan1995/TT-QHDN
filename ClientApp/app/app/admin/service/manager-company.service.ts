import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerCompanyService {
    constructor(private http: CommonHttpService<Company>) { }
    getCompanyPage(body: any): Promise<any> {
        return this.http.post(URL_ADMIN.GET_PAGE_COMPANY, body, this.http.createHeader()).toPromise();
    }
    createCompany(body: any) {
        return this.http.post(URL_ADMIN.CREATE_COMPANY, body, this.http.createHeader()).toPromise();
    }
    getCompany(id: number): Promise<Company> {
        return this.http.get<Company>(URL_ADMIN.INFO_COMPANY, id, this.http.createHeader()).toPromise();
    }
    updateCompany(id: number, body: any) {
        return this.http.put(URL_ADMIN.UPDATE_COMPANY, id, body, this.http.createHeader()).toPromise();
    }
    deleteCompany(id: number) {
        return this.http.delete(URL_ADMIN.DETELE_COMPANY, id, this.http.createHeader()).toPromise();
    }
    activate(id: number, body: any) {
        return this.http.put(URL_ADMIN.ACTIVATE_COMPANY, id, body, this.http.createHeader()).toPromise();
    }
}
