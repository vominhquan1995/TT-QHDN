import { Component } from '@angular/core';
import { ConfirmService } from '@services/frontend/confirm.service';
import { AlertService } from '@services/frontend/alert.service';
import { CommonHttpService } from '@services/backend/common-http.service';
import { LoadingService } from '@services/frontend/loading.service';
@Component({
    selector: 'event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent {
    constructor(private confirmSvc: ConfirmService, private alertSvc: AlertService, private http: CommonHttpService<any>,
        private loadingSvc: LoadingService) { }
    ngOnInit() {
        this.loadingSvc.showLoading(false);
    }
}