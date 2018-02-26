import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { URL_ADMIN } from "@app/admin/service/variables";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ManagerUserService {
    constructor(private http: CommonHttpService<Account>) { }
    getAccountsPage(body: any): Promise<any> {
        return this.http.post(URL_ADMIN.GET_PAGE_ACCOUNT, body, this.http.createHeader()).toPromise();
    }
    getAllRole() {
        return this.http.gets(URL_ADMIN.GET_ALL_ROLE, this.http.createHeader()).toPromise();
    }
    createUser(body: any) {
        return this.http.post(URL_ADMIN.CREATE_USER, body, this.http.createHeader()).toPromise();
    }
    activateUser(guid: string, body: any) {
        return this.http.put(URL_ADMIN.ACTIVATE_USER, guid, body, this.http.createHeader()).toPromise();
    }
    getUser(guid: string) {
        return this.http.get(URL_ADMIN.GET_INFO_USER, guid, this.http.createHeader()).toPromise();
    }
    getAllCompany() {
        return this.http.gets(URL_ADMIN.GET_ALL_COMPANY, this.http.createHeader()).toPromise();
    }
    updateUser(body: any) {
        return this.http.post(URL_ADMIN.UPDATE_USER, body, this.http.createHeader()).toPromise();
    }
    deleteUser(guid: string) {
        return this.http.delete(URL_ADMIN.DETELE_USER, guid, this.http.createHeader()).toPromise();
    }
}
