import { Component, ViewChild, TemplateRef, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { Subscription } from "rxjs/Subscription";
@Component({
    selector: 'admin-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class AdminLoadingComponent {
    @Input() isLoader: boolean;
}
