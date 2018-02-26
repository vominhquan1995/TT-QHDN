import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables, Status_Job } from "@app/admin/shared/variables";
import { AdminCkeditor } from '@app/admin/shared/components/ckeditor/ckeditor.component';
import * as moment from 'moment';
import { ManagerJobService } from '@app/admin/service/manager-job.service';
import { Router } from '@angular/router';
@Component({
    selector: 'create-job',
    templateUrl: './create-job.component.html',
    styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
    ngOnInit(): void {
        this.getAllCompany();
        this.getAllJobGroup();
        this.getAllWorkType();
    }
    //save list role
    roles: any;
    //save list company;
    companies: any;
    //save list work typ;
    worktypes: any;
    //save list company;
    jobgroups: any;
    //value work type
    worktypeSelected: number;
    //value company
    companySelected: number;
    // value job group
    jobgroupSelected: number;
    timeDeadline: string;
    sex: boolean;
    isHot: boolean;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @ViewChild(AdminCkeditor) _ckEditor: AdminCkeditor;
    constructor(
        private modalService: NgbModal,
        private service: ManagerJobService,
        private router: Router
    ) {

    }
    timeChange(time: any) {
        this.timeDeadline = time;
    }
    sexChange(sex: boolean) {
        this.sex = sex;
    }
    //dropdown change
    jobgroupChange(jobgroupID: any) {
        this.jobgroupSelected = jobgroupID;
    }
    worktypeChange(worktypeID: any) {
        this.worktypeSelected = worktypeID;
    }
    companyChange(companyId: any) {
        this.companySelected = companyId;
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
    getAllCompany() {
        this.service.getAllCompany().then(result => {
            this.companies = result;
        })
    }
    create(form: any) {
        if (this.companySelected == undefined) {
            this.showToast('Chưa chọn doanh nghiệp', 'warning', false)
            return;
        } else if (this.worktypeSelected == undefined) {
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
                ContentURL: this._ckEditor.getContent(),
                TimePre: form.value.TimePre,
                // MajorTag: form.value.MajorTag,
                Age: form.value.Age,
                DeadlineApply: this.timeDeadline,
                AppliedCount: 0,
                ViewCount: 0,
                Salary: form.value.Salary,
                CompanyId: this.companySelected,
                WorkTypeId: this.worktypeSelected,
                JobGroupId: this.jobgroupSelected,
                Status: Status_Job.Active,
                IsHot: this.isHot
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
                this.back()
            }
            return null
        }, 1000)
    }
    back() {
        this.reset();
        this.router.navigate(['admin/manager-job']);
    }
    reset() {
        this.error.mess = '';
        this.error.type = '';
    }
    hotChange(isHot: boolean) {
        this.isHot = isHot;
    }
}
