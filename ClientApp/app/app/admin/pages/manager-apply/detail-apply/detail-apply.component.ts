import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { UtilFunction } from "@app/admin/shared/util";
import { ApplyService } from '@services/backend/apply.service';
import { ManagerApplyService } from '@app/admin/service/manager-apply.service';
@Component({
    selector: 'detail-apply',
    templateUrl: './detail-apply.component.html',
    styleUrls: ['./detail-apply.component.scss']
})
export class DetailApplyComponent implements OnInit {
    ngOnInit(): void {
    }
    modalRef: any;
    model: Apply;
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerApplyService
    ) {
    }
    open(accountId: number, jobId: number) {
        this.service.getApply(accountId, jobId).then(data => {
            
            this.model = data;
            
            let options: NgbModalOptions = {
                size: 'lg'
            };
            this.modalRef = this.modalService.open(this.content, options);
        })
    }
    close() {
        this.modalRef.close();
    }
}

