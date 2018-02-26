import { Component, ViewChild, TemplateRef, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { Subscription } from "rxjs/Subscription";
@Component({
    selector: 'admin-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class AdminDialogComponent implements OnDestroy {
    ngOnDestroy(): void {
        this.subcription.unsubscribe();
    }
    @ViewChild('content') content: TemplateRef<any>;
    //tạo sự kiện chạy dưới nền
    subcription: Subscription;
    modalRef: any;
    Title: string = '';
    Message: string = '';
    Action: () => void;
    constructor(
        private modalService: NgbModal,
        private serviceDialog: AdminDialogService
    ) {
        this.subcription = this.serviceDialog.dialogEvent.subscribe((body: any) => {
            this.Title = body.title;
            this.Message = body.message;
            this.Action = body.action;
            this.show();
        })
    }
    show() {
        this.modalRef = this.modalService.open(this.content);
    }
    Ok() {
        this.Action();
        this.modalRef.close();
    }
    Cancel() {
        this.modalRef.close();
    }
}
