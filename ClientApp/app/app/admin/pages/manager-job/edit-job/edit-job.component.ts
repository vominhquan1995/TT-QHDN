import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ManagerJobService } from '@app/admin/service/manager-job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCkeditor } from '@app/admin/shared/components/ckeditor/ckeditor.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
    selector: 'edit-job',
    templateUrl: './edit-job.component.html',
    styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
    constructor(
        private service: ManagerJobService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit(): void {
        this.getAllCompany();
        this.getAllWorkType();
        this.getAllJobGroup();
        this.route.params.subscribe(param => {
            let jobId = param['id']
            this.getInfoJob(jobId).then(result => {
                this.jobModel = result;
                this.jobModel.deadlineApply = moment(this.jobModel.deadlineApply).format("YYYY/MM/DD");
            })
        })
    }
    @ViewChild(AdminCkeditor) _ckEditor: AdminCkeditor;
    //save list role
    roles: any;
    //save list company;
    companies: any;
    //save list work typ;
    worktypes: any;
    //save list company;
    jobgroups: any;
    jobModel: any;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    timeChange(time: any) {
        this.jobModel.deadlineApply = time;
    }
    save() {
        this.service.updateJob(this.jobModel.id, this.jobModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
    }
    getInfoJob(guid: string) {
        return this.service.getJob(guid).then(result => {
            return result
        })
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
    back() {
        this.router.navigate(['admin/manager-job']);
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
}
