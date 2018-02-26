import { Component, OnInit } from '@angular/core';
import { AuthService } from "@services/backend/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "@services/frontend/alert.service";
import { UtilFunction } from '@app/admin/shared/util';
@Component({
    selector: 'admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginAdminComponent implements OnInit {
    constructor(
        private _auth: AuthService,
        private router: Router,
        private alert: AlertService) {
    }
    ngOnInit(): void {

    }
    signIn(form: any) {
        if (form.valid) {
            let loginModel = form.value;
            this._auth.login(loginModel).then(result => {
                if (result) {
                    if (this._auth.isAdmin()) {
                        this.alert.show("Thông báo", "Đăng nhập thành công")
                        UtilFunction.delayAction(500, () => {
                            this.router.navigate(['/admin/dashboard'])
                        })
                    } 
                    // else if (this._auth.isCompany()) {
                    //     this.alert.show("Thông báo", "Đăng nhập thành công")
                    //     UtilFunction.delayAction(500, () => {
                    //         this.router.navigate(['/admin/dn/dashboard'])
                    //     })
                    // } 
                    // else {
                    //     this.alert.show('Cảnh báo', 'Đừng cố truy cập hệ thống', 'danger');
                    // }
                } 
                // else {
                //     this.alert.show('Cảnh báo', 'Tài khoản hoặc mật khẩu không đúng', 'warning');
                // }
            })
        }
    }
}