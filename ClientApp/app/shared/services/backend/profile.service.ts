import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CommonHttpService } from '@services/backend/common-http.service';
import { Profile } from '@models/profile.model';
import { URL } from '@services/service.variables';
import { LocalService } from '@services/backend/local.service';
import { LoadingService } from '@services/frontend/loading.service';

@Injectable()
export class ProfileService {
    private URL = URL.PROFILE_URL;
    constructor(private http: CommonHttpService<Profile>, private localSvc: LocalService, private loadingSvc: LoadingService) { }
    getProfile(): Observable<Profile> {
        const guid = this.localSvc.getGuid();
        return this.http.get(this.URL, guid, this.http.createHeader());
    }
    getAccount(): Observable<Account> {
        const guid = this.localSvc.getGuid();
        return this.http.post(this.URL + "/profiles", guid, this.http.createHeader());
    }
    updatePassword(oldPassword: string, newPassword: string) {
        const guid = this.localSvc.getGuid();
        return this.http.post(this.URL + `/${guid}/update-password`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, this.http.createHeader());
    }
    updateAccount(model: Account): Observable<Account> {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.post(this.URL, model, this.http.createHeader());
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    updateCV(model: CV): Observable<CV> {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.post(this.URL + "/cv", model, this.http.createHeader());
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    updateCompany(model: Company): Observable<Company> {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.post(this.URL + "/company", model, this.http.createHeader());
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
}