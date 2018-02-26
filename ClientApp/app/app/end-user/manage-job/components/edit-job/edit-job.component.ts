import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCkeditor } from '@app/admin/shared/components/ckeditor/ckeditor.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { JobService } from "@services/backend/job.service";
@Component({
    selector: 'modal-edit-job',
    templateUrl: './edit-job.component.html',
    styleUrls: ['./edit-job.component.scss']
})
export class ModalEditJobComponent implements OnInit {
    constructor(
        private service: JobService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) { }
    modalRef: any;
    jobModel: any;
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: TemplateRef<any>;
    open(idJob: number) {
        this.service.getJob(idJob).then(result => {
            this.jobModel = result;
            this.jobModel.deadlineApply = moment(this.jobModel.deadlineApply).format("YYYY/MM/DD");
            let options: NgbModalOptions = {
                size: 'lg'
            };
            this.modalRef = this.modalService.open(this.content, options);
        })
    }
    ngOnInit(): void {
        this.getAllWorkType();
        this.getAllJobGroup();
    }
    //save list role
    roles: any;
    //save list work typ;
    worktypes: any;
    //save list company;
    jobgroups: any;
    //content html
    contentHtml: string;
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
    showToast(mess: string, type: string, isClose: boolean) {
        this.error.mess = mess;
        this.error.type = type;
        setTimeout((time) => {
            this.error.mess = '';
            this.error.type = '';
            if (isClose) {
                this.close()
            }
            return null
        }, 1000)
    }
    contentHtmlChange(body: string) {
        this.contentHtml = body;
    }
    close() {
        this.submitData.emit();;
        this.modalRef.close();
    }
}
