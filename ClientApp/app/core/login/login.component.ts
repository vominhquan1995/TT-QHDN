import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/backend/auth.service';
import { LoadingService } from '@services/frontend/loading.service';
import { RoleService } from '@services/backend/role.service';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '@services/frontend/alert.service';

@Component({
    selector: 'hure-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Input() isLogin: boolean = true;
    @Input() isSignUp: boolean = false;
    loginForm: FormGroup;
    forgetForm: FormGroup;
    @Output() close$: EventEmitter<boolean> = new EventEmitter<boolean>()
    constructor(private fb: FormBuilder, private authSvc: AuthService,
        private loadingSvc: LoadingService, private alertSvc: AlertService) {
        this.createForm();
    }
    closeEmitter($event: any) {
        this.close()
    }
    close() {
        this.close$.emit(true)
    }
    changeView(isLogin: boolean, isSignUp: boolean) {
        this.isLogin = isLogin;
        this.isSignUp = isSignUp;
    }
    submitForget() {
        // do stuff
    }
    ngOnInit() {
    }
    createForm() {
        this.loginForm = this.fb.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
        this.forgetForm = this.fb.group({
            email: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
        })

    }

    async submit() {
        let loginModel = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        }
        try {
            this.loadingSvc.showLoading(true);
            var isLoggedIn = await this.authSvc.login(loginModel);
            if (isLoggedIn) {
                this.alertSvc.show("Thông báo", "Đăng nhập thành công");
            } else {
                // this.alertSvc.show("Thông báo","Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập.","danger");
            }
        } finally {
            this.loadingSvc.showLoading(false);
            this.close()
        }
    }
    // outSide() {
    //     this.close()
    // }
}