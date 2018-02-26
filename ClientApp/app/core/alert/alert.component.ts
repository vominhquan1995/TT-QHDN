import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { AlertService } from '@services/frontend/alert.service';
@Component({
    selector: 'hure-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('alertShowChanged', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(250, style({ opacity: '*' }))
            ]),
            transition('* => void', [
                style({ opacity: '*' }),
                animate(250, style({ opacity: 0 }))
            ]),

        ])
    ]
})
export class AlertComponent implements OnInit, OnDestroy {
    subcription: Subscription;
    isActivated: boolean;
    type:string="warning"
    alertList: Alert[] = [];
    ngOnDestroy(): void {
        this.subcription.unsubscribe();
    }
    constructor(private alertService: AlertService) {
    }
    ngOnInit() {
        this.subcription = this.alertService.alertChanged.subscribe((body: any) => {
            let alert = body as Alert;
            this.type = body.type||'success'
            this.alertList.push(alert);
            this.isActivated = true;
            this.showAlert(alert);
        })
    }
    private showAlert(alert: Alert) {
        if (this.alertList.length === 0) {
            this.isActivated = false;
            return;
        }
        setTimeout(() => {
            this.close(alert);
        }, 5000);
    }
    close(alert: Alert) {
        let alertIndex = this.alertList.indexOf(alert);
        this.alertList.splice(alertIndex, 1);
    }
    exec(a:Alert){
        a.action();
    }
}

interface Alert {
    message: string;
    action: () => void;
    title: string;
    type?:string
}
