

import { Injectable, EventEmitter } from "@angular/core";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { UrlVariable, STATUS_CODE } from "@shared/_variables";
import { CommonHttpService } from "@services/backend/common-http.service";
import { Headers } from '@angular/http';
import { window } from "rxjs/operators/window";
import { AlertService } from "@services/frontend/alert.service";
import { toString } from "@ng-bootstrap/ng-bootstrap/util/util";
import { Role_Name } from "@app/admin/shared/variables";
import { UtilFunction } from "@app/admin/shared/util";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    login$: EventEmitter<boolean> = new EventEmitter();
    loginRequest$: EventEmitter<boolean> = new EventEmitter();
    constructor(private httpClient: CommonHttpService<any>, private toaster: AlertService, private router: Router) { }
    createHeader(): Headers {
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        return headers;
    }
    async signUp(user: any, isCompany: boolean = false): Promise<boolean> {
        let body = {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            mssv: user.mssv,
            password: user.password,
            companyName: user.companyName,
            companyWebsite: user.companyWebsite,
            companyEmail: user.companyEmail,
            companyAddress: user.companyAddress,
            taxCode: user.taxCode,
            companyDescription: user.companyDescription,
            companyPhone: user.companyPhone,
            roleId: user.roleId
        }
        try {
            let result: any
            if (isCompany) {
                result = await this.httpClient.post("/api/sign-up/company", body, this.createHeader())
                    .toPromise()
            } else {
                result = await this.httpClient.post("/api/sign-up/student", body, this.createHeader())
                    .toPromise()
            }
            if (result == true) {
                this.toaster.show("Đăng kí thành công", "Đăng nhập để sử dụng.");
            } else {
                this.toaster.show("Đăng kí thất bại", "Vui lòng thử lại sau.", "danger");
            }
            return result;
        } catch (err) {
            return false;
        }
    }
    async login(user: any) {
        let body = {
            username: user.username,
            password: user.password
        }
        return this.httpClient.post(UrlVariable.URL_LOGIN, body, this.createHeader()).toPromise().then((res) => {
            var tokenAuth = (res as TokenProvider);
            if (typeof window != "undefined") {
                // this.toaster.show("Thông báo", "Đăng nhập thành công")
                localStorage.setItem('token_hure', tokenAuth.token);
                localStorage.setItem('userId', tokenAuth.guid.toString());
                localStorage.setItem('id', tokenAuth.id.toString());
                localStorage.setItem('role', tokenAuth.role.toString());
                localStorage.setItem('username', tokenAuth.username.toString());
                if (tokenAuth.companyId != undefined) {
                    localStorage.setItem('companyId', tokenAuth.companyId.toString());
                }
            }
            this.login$.emit(true);
            return true;
        }).catch(err => {
            if (err.status == STATUS_CODE.Bad_Request) {
                this.toaster.show("Thông báo", "Tên tài khoản hoặc mật khẩu không đúng", 'warning')
                return false
            } else if (err.status == STATUS_CODE.Forbidden) {
                this.toaster.show("Thông báo", "Tài khoản đang chờ xét duyệt", 'warning')
                return false
            } else {
                return false;
            }
        });
    }
    private extractdata(res: Response) {
        let body = res.json();
        return body || {};
    }
    isLogged() {
        if (typeof window != "undefined") {
            if (typeof localStorage != 'undefined') {
                var token = localStorage.getItem("token_hure");
                if (token) {
                    var jwt = new JwtHelper();
                    if (!jwt.isTokenExpired(token)) {
                        return true;
                    }
                    return false;
                }
                return false;
            }

        }
        return false;
    }
    isAdmin() {
        if (typeof window != "undefined") {
            if (localStorage) {
                var role = localStorage.getItem("role");
                if (role == Role_Name.Admin) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }
    isCompany() {
        if (typeof window != "undefined") {
            if (localStorage) {
                var role = localStorage.getItem("role");
                if (role == Role_Name.DoanhNghiep) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }
    logout() {
        if (typeof window != "undefined") {
            // this.toaster.show("Thông báo", "Đăng xuất thành công")
            localStorage.clear();
            this.router.navigate(['']);
            this.login$.emit(false);
        }
    }
}
export class TokenProvider {
    token: string;
    expires_in: Date;
    guid: any;
    id: number;
    role: string;
    username: string;
    companyId?: number;
    constructor(token: string, guid: any, expiresin: Date, id: number, role: string, username: string, companyId?: number) {
        this.token = token;
        this.guid = guid;
        this.expires_in = expiresin;
        this.id = id;
        this.role = role;
        this.username = username;
        this.companyId = companyId;
    }
}