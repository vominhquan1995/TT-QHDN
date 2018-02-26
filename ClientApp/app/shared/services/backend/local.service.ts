import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class LocalService {

    constructor() { }
    getGuid() {
        if (typeof window != "undefined") {
            return localStorage.getItem('userId');
        }
    }
    getAccountId() {
        if (typeof window != "undefined") {
            return localStorage.getItem('id')
        }
    }
    getRole() {
        if (typeof window != "undefined") {
            var jwt = new JwtHelper();
            var token = localStorage.getItem('token_hure');
            if (token) {
                var roleJson = jwt.decodeToken(token);
                var role = roleJson.Role;
                return role;
            }
        }
    }
    getCompanyId() {
        if (typeof window != "undefined") {
            return localStorage.getItem('companyId');
        }
    }
}