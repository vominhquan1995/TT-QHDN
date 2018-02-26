import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from "@services/backend/auth.service";
import { ADMIN_MENU } from '@app/admin/admin.menu';
import { UtilFunction } from '@app/admin/shared/util';
import { AlertService } from '@services/frontend/alert.service';

@Component({
    selector: 'admin-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderAdminComponent implements OnInit {
    ngOnInit(): void {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.expand()
            ) {
                this.toggleSidebar();
            }
        });
        this.buildMenu(ADMIN_MENU)
        if (window != undefined) {
            this.username = localStorage.getItem('username') || 'Không xác định';
        }
    }
    toggleClass: string = 'sidenav-toggled';
    listMenu: any;
    username: string;
    constructor(public router: Router, private _auth: AuthService, private alert: AlertService) {
    }
    toggleSidebar() {
        //thu nho nav
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.toggleClass);
        //dong cac menu con
        // const dom1: any = document.querySelector('.navbar-sidenav .nav-link-collapse');
        // dom1.classList.add("collapsed");
        // const dom2: any = document.querySelector('.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level');
        // dom2.classList.remove("show");
    }
    logout() {
        this._auth.logout();
        this.alert.show('Thông báo', 'Đăng xuất thành công')
        UtilFunction.delayAction(500, () => {
            this.router.navigate(['/admin/login']);
        })
    }
    expand() {
        const dom: any = document.querySelector('body');
        dom.classList.remove(this.toggleClass);
    }
    buildMenu(listMenu: any[]) {
        let Role = localStorage.getItem('role');
        listMenu.forEach(element => {
            if (element.role != Role) {
                element.skip = true;
            } else {
                element.skip = false;
            }
        });
        this.listMenu = listMenu;
    }
}
