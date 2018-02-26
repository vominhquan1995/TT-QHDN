import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { UtilFunction } from "@app/admin/shared/util";
@Component({
    selector: 'detail-job',
    templateUrl: './detail-job.component.html',
    styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {
    ngOnInit(): void {
    }
    modalRef: any;
    model: Job;
    //show dropdown company
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
    ) {
    }
    open(model: Job) {
        // model.lowestSalaryShow = UtilFunction.parseSalary(model.lowestSalary);
        // model.highestSalaryShow = UtilFunction.parseSalary(model.highestSalary);
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

