import { Component, OnInit, EventEmitter } from '@angular/core';
import { MenuItem } from '@ui/action-menu/action-menu.component';
import { AuthService } from '@services/backend/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { LocalService } from '@services/backend/local.service';

@Component({
    selector: 'hure-action-bar',
    templateUrl: 'action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})

export class ActionBarComponent implements OnInit {
    actionItems: MenuItem[]
    sub: Subscription
    role:string
    constructor(private authSvc: AuthService, private localSvc:LocalService) { }
    isLoggedIn: boolean;
    ngOnInit() {
        this.sub = this.authSvc.login$.subscribe((r: any) => this.createView());

        this.createView()
    }
    createView() {
        this.role = this.localSvc.getRole();
        this.isLoggedIn = this.authSvc.isLogged();
        this.actionItems = [{
            iconClass: "fa fa-file",
            isDisabled:this.role!="Student",
            text: "Tạo hồ sơ",
            action: () => { },
            isVisibled: this.isLoggedIn
        }, {
            iconClass: "fa fa-clipboard",
            text: "Đăng bài",
            isDisabled:this.role!="Company",
            action: () => { },
            isVisibled: this.isLoggedIn
        }, {
            iconClass: "fa fa-sign-in",
            text: "Đăng nhập",
            action: () => { this.authSvc.loginRequest$.emit(true) },
            isVisibled: !this.isLoggedIn
        },
        {
            iconClass: "fa fa-user-plus",
            text: "Đăng kí",
            action: () => { this.authSvc.loginRequest$.emit(false) },
            isVisibled: !this.isLoggedIn
        }]
    }
}