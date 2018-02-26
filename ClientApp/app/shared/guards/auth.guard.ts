import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (typeof window !== "undefined") {
            var jwt = new JwtHelper();
            var token = localStorage.getItem('token_hure');
            if (token) {
                if (jwt.isTokenExpired(token)) {
                    this.router.navigate([""]);
                    return false;
                }
                return true;
            }
            this.router.navigate([""]);
            return false;
        } else {
            return false;
        }
    }
}