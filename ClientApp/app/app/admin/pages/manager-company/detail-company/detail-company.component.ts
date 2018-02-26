import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { UtilFunction } from "@app/admin/shared/util";
@Component({
    selector: 'detail-company',
    templateUrl: './detail-company.component.html',
    styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {
    ngOnInit(): void {
    }
    modalRef: any;
    model: Company;
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
    ) {
    }
    open(model: Company) {
        this.model = model;
        let options: NgbModalOptions = {
            size: 'lg'
        };
        this.modalRef = this.modalService.open(this.content, options);
    }
    close() {
        this.modalRef.close();
    }
}

