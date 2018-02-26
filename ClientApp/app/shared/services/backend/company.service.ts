import { Injectable } from '@angular/core';
import { URL, STATUS } from '@services/service.variables';
import { CommonHttpService } from '@services/backend/common-http.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CompanyService {
    private readonly URL = URL.COMPANY_URL;
    constructor(private http: CommonHttpService<Company>) { }
    getBrands() {
        return this.http.gets<Company>(this.URL, this.http.createHeader()).share()
    }
    getCompany(id: number) {
        return this.http.get<Company>(this.URL, id);
    }
    getJobOfCompany(id: number) {
        return this.http.gets<Job>(this.URL + `/${id}/jobs`, this.http.createHeader()).map(com => {
            return com.filter(f => f.status && f.status!.toUpperCase() == STATUS.ACTIVE);
        }).share()
    }
    getCompanies() {
        return this.http.gets(this.URL, this.http.createHeader()).share()
    }
    getCompaniesPage(page:number) {
        return this.http.get<any>(this.URL , `page/${page-1}`, this.http.createHeader()).share()
    }
    getCompaniesPageSearch(keyword:string, page:number){
        return this.http.get<any>(this.URL , `search-page/${page-1}?keyword=${keyword}`, this.http.createHeader()).share()
    }
    getPartner() {
        return this.http.gets<Company>(this.URL+"/partner", this.http.createHeader()).share();
    }
    getJobsOfCompanyOfAccount(userId: number) {
        return this.http.gets<Job>(this.URL + `/${userId}/job-of-company-of-user`).share()
    }
}