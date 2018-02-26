import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AdminAlertComponent implements OnInit {
    private type: string;
    private message: string;
    constructor() {
    }
    ngOnInit() { }
    public success(message: string) {
        this.type = 'success';
        this.message = message;
    }
    public info(message: string) {
        this.type = 'info';
        this.message = message;
    }
    public warning(message: string) {
        this.type = 'warning';
        this.message = message;
    }
    public danger(message: string) {
        this.type = 'danger';
        this.message = message;
    }
    close() {

    }
    // public closeAlert(alert: any) {
    //     const index: number = this.alerts.indexOf(alert);
    //     this.alerts.splice(index, 1);
    // }
}
