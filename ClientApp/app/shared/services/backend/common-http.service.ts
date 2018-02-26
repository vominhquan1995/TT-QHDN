import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from '../frontend/loading.service';
import { AlertService } from '../frontend/alert.service';
import { Http, Headers, Response } from '@angular/http';
import { share } from 'rxjs/operator/share';
import { of } from "rxjs/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class CommonHttpService<T>{
    constructor(protected http: Http, protected loadingSvc: LoadingService, protected alertSvc: AlertService) { }
    protected extractdata(res: Response) {
        let body = res.json();
        return body || {};
    }
    // public createHeader(): Headers {
    //     const headers = new Headers();
    //     headers.set("Content-Type", "application/json");
    //     return headers;
    // }
    createHeader(): Headers {
        var headers = new Headers();
        if (typeof window != "undefined") {
            var jwt = new JwtHelper();
            var token = localStorage.getItem("token_hure");
            if (token) {
                headers.append("Authorization", "Bearer " + token);
            }
        }
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    gets<T>(url: string, headers?: Headers): Observable<T[]> {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.get(url, { headers: headers || this.createHeader() })!
                .map(this.extractdata).catch(err => []);
        } catch (err) {
            return new Observable<T[]>(sub => sub.next());
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }

    get<T>(url: string, id?: any, headers?: Headers): Observable<T> {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.get(url + ("/" + id!.toString()) || "", { headers: headers || this.createHeader() })!
                .map(this.extractdata).catch(err => new Observable<T>(sub => sub.next()));
        } catch (err) {
            return new Observable<T>(sub => sub.next());
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    getTwoId<T>(url: string, id1?: any, id2?: any, headers?: Headers): Observable<T> {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.get(url + (("/" + id1!.toString()) || "") + (("/" + id2!.toString()) || ""), { headers: headers || this.createHeader() })!
                .map(this.extractdata).catch(err => new Observable<T>(sub => sub.next()));
        } catch (err) {
            return new Observable<T>(sub => sub.next());
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    post(url: string, body: any, headers?: Headers) {

        try {
            this.loadingSvc.showLoading(true);
            return this.http.post(url, JSON.stringify(body), { headers: headers || this.createHeader() })!
                .map(this.extractdata)
                .catch(err => {
                    return Promise.reject(err)
                });
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    put(url: string, id: any, body: any, headers?: Headers) {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.put(url + id.toString(), JSON.stringify(body), { headers: headers || this.createHeader() })!
                .map(this.extractdata).catch(err => []);
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    delete(url: string, id: any, headers?: Headers) {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.delete(url + id.toString(), { headers: headers || this.createHeader() })!
                .map(this.extractdata).catch(err => []);
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
    deleteTwoId(url: string, id1: any, id2: any, headers?: Headers) {
        try {
            this.loadingSvc.showLoading(true);
            return this.http.delete(url + id1.toString() + '/' + id2.toString(), { headers: headers || this.createHeader() })!
                .map(this.extractdata).catch(err => []);
        } catch (err) {
            return new Observable(s => s.next())
        } finally {
            this.loadingSvc.showLoading(false);
        }
    }
}