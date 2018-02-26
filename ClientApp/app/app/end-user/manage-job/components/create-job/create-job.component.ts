import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables, Status_Job } from "@app/admin/shared/variables";
import { ManagerEventService } from '@app/admin/service/manager-event.service';
import * as moment from 'moment';
import { JobService } from "@services/backend/job.service";
@Component({
    selector: 'modal-create-job',
    templateUrl: './create-job.component.html',
    styleUrls: ['./create-job.component.scss']
})
export class ModalCreateJobComponent implements OnInit {
    ngOnInit(): void {
        this.getAllJobGroup();
        this.getAllWorkType();
    }
    modalRef: any;
    //save list role
    roles: any;
    //save list work typ;
    worktypes: any;
    //save list company;
    jobgroups: any;
    //value work type
    worktypeSelected: number;
    //value company
    companyId: number;
    // value job group
    jobgroupSelected: number;
    timeDeadline: string;
    //content html
    contentHtml: string;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: JobService,
    ) {

    }
    timeChange(time: any) {
        this.timeDeadline = time;
    }
    //dropdown change
    jobgroupChange(jobgroupID: any) {
        this.jobgroupSelected = jobgroupID;
    }
    worktypeChange(worktypeID: any) {
        this.worktypeSelected = worktypeID;
    }
    getAllWorkType() {
        this.service.getAllWorkType().then(result => {
            this.worktypes = result;
        })
    }
    getAllJobGroup() {
        this.service.getAllJobGroup().then(result => {
            this.jobgroups = result;
        })
    }
    open(company_id: number) {
        if (company_id == null) {
            this.showToast('Lỗi đã xảy ra', 'warning', true)
        } else {
            this.companyId = company_id;
            let options: NgbModalOptions = {
                size: 'lg'
            };
            this.modalRef = this.modalService.open(this.content, options);
        }
    }
    create(form: any) {
        if (this.worktypeSelected == undefined) {
            this.showToast('Chưa chọn loại hình làm việc', 'warning', false)
            return;
        } else if (this.jobgroupSelected == undefined) {
            this.showToast('Chưa chọn nhóm việc', 'warning', false)
            return;
        } else if (!moment(this.timeDeadline).isAfter(new Date())) {
            this.showToast('Hạn chót nộp phải sau ngày hiện tại', 'warning', false)
            return;
        } else {
            let body = {
                Place: form.value.Place,
                Title: form.value.Title,
                ShortDescription: form.value.ShortDescription,
                Experience: form.value.Experience,
                Position: form.value.Position,
                Benefit: form.value.Benefit,
                Number: form.value.Number,
                ContentURL: this.contentHtml,
                TimePre: form.value.TimePre,
                DeadlineApply: this.timeDeadline,
                AppliedCount: 0,
                ViewCount: 0,
                Salary: form.value.Salary,
                CompanyId: this.companyId,
                WorkTypeId: this.worktypeSelected,
                JobGroupId: this.jobgroupSelected,
                Status: Status_Job.Spending
            }
            this.service.createJob(body).then(result => {
                if (result == true) {
                    this.showToast('Thành công', 'success', true)
                } else {
                    this.showToast('Thêm thất bại', 'danger', false)
                }
            })
        }
    }
    showToast(mess: string, type: string, isClose: boolean) {
        this.error.mess = mess;
        this.error.type = type;
        setTimeout((time) => {
            this.error.mess = '';
            this.error.type = '';
            if (isClose) {
                this.close();
            }
            return null
        }, 1000)
    }
    close() {
        this.reset();
        this.submitData.emit();;
        this.modalRef.close();
    }
    reset() {
        this.error.mess = '';
        this.error.type = '';
    }
    contentHtmlChange(body: string) {
        this.contentHtml = body;
    }
}
