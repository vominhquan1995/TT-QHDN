import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ManagerJobGroupService } from "@app/admin/service/manager-job-group.service";
@Component({
    selector: 'edit-job-group',
    templateUrl: './edit-job-group.component.html',
    styleUrls: ['./edit-job-group.component.scss']
})
export class EditJobGroupComponent implements OnInit {
    ngOnInit(): void {

    }
    closeResult: string;
    modalRef: any;
    JobGroupModel: any;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('edit') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerJobGroupService
    ) { }
    open(id: number) {
        this.getInfoJobGroup(id).then(result => {
            this.JobGroupModel = result;
            this.modalRef = this.modalService.open(this.content);
        })
    }
    save() {
        this.service.updateJobGroup(this.JobGroupModel.id, this.JobGroupModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
    }
    getInfoJobGroup(id: number) {
        return this.service.getJobGroup(id).then(result => {
            return result
        })
    }
    close() {
        this.submitData.emit();;
        this.modalRef.close();
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
}
