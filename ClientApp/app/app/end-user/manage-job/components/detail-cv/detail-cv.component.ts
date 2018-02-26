import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { UtilFunction } from "@app/admin/shared/util";
@Component({
    selector: 'detail-cv',
    templateUrl: './detail-cv.component.html',
    styleUrls: ['./detail-cv.component.scss']
})
export class DetailCvComponent implements OnInit {
    private itemApply: any;
    ngOnInit(): void {
    }
    modalRef: any;
    model: Account;
    //show dropdown company
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
    ) {
    }
    open(model: Account, idJob: number) {
        //get info apply of user with this job
        this.itemApply = model.applys[model.applys.findIndex(x => x.jobId == idJob)];
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

