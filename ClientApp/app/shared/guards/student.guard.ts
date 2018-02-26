import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class StudentGuard implements CanActivate {

    constructor(private _router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (typeof window !== "undefined") { // check if not localStorage is not defined
            var jwt = new JwtHelper();
            var token = localStorage.getItem('token_hure');
            if (token) {
                if (jwt.isTokenExpired(token)) {
                    this._router.navigate(["sinhvien/login"]);
                    return false;
                } else {
                    var roleJson = jwt.decodeToken(token);
                    var role = roleJson.Role;
                    if (role == "Student") {
                        return true;
                    }
                    return false;
                }
            } else {
                this._router.navigate(["sinhvien/login"]);
            }
            return false;
        } else {
            return false;
        }
    }
}