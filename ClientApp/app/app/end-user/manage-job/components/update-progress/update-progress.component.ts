import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { UtilFunction } from "@app/admin/shared/util";
import { ApplyService } from '@services/backend/apply.service';
import { Status_Apply } from '@shared/_variables';
import { AlertService } from '@services/frontend/alert.service';
@Component({
    selector: 'update-progress',
    templateUrl: './update-progress.component.html',
    styleUrls: ['./update-progress.component.scss']
})
export class UpdateProgressComponent implements OnInit {
    ngOnInit(): void {
    }
    modalRef: any;
    model: Account;
    private accountId: number;
    private jobId: number;
    private Status = Status_Apply;
    private isDone: boolean = false;
    private listOption = [
        { key: 'seen', value: true, classColor: 'badge  badge-secondary', title: 'Xem' },
        { key: 'interview', value: true, classColor: 'badge badge-info', title: 'Hẹn phỏng vấn' },
        { key: 'passed', value: true, classColor: 'badge badge-success', title: 'Tiếp nhận' },
        { key: 'failed', value: true, classColor: 'badge badge-danger', title: 'Loại hồ sơ' },
    ]
    //show dropdown company
    @ViewChild('content') content: TemplateRef<any>;
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    constructor(
        private modalService: NgbModal,
        private service: ApplyService,
        private toast: AlertService
    ) {
    }
    open(accountId: number, jobId: number, status: string) {
        this.handleBlock(status)
        this.accountId = accountId;
        this.jobId = jobId;
        let options: NgbModalOptions = {
            size: 'lg'
        };
        this.modalRef = this.modalService.open(this.content, options);
    }
    close() {
        this.modalRef.close();
    }
    updateStatus(status: string) {
        this.service.updateStatus(this.accountId, { JobId: this.jobId, Status: status }).then(data => {
            this.toast.show('Thông báo', 'Cập nhật thành công');
            this.submitData.emit();
            this.close();
        })
    }
    handleBlock(status: string) {
        if (status == this.Status.Seen) {
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Seen)].value = false;
        } else if (status == this.Status.
            Interview) {
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Seen)].value = false;
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Interview)].value = false;
        } else if (status == this.Status.
            Passed || status == this.Status.
                Failed) {
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Seen)].value = false;
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Interview)].value = false;
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Passed)].value = false;
            this.listOption[this.listOption.findIndex(x => x.key == this.Status.Failed)].value = false;
            this.isDone = true;
        }
    }
}

