import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ManagerWorkTypeService } from '@app/admin/service/manager-work-type.service';
@Component({
    selector: 'edit-work-type',
    templateUrl: './edit-work-type.component.html',
    styleUrls: ['./edit-work-type.component.scss']
})
export class EditWorkTypeComponent implements OnInit {
    ngOnInit(): void {

    }
    closeResult: string;
    modalRef: any;
    WorkTypeModel: any;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('edit') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerWorkTypeService
    ) { }
    open(id: number) {
        this.getInfoWorkType(id).then(result => {
            this.WorkTypeModel = result;
            this.modalRef = this.modalService.open(this.content);
        })
    }
    save() {
        this.service.updateWorkType(this.WorkTypeModel.id, this.WorkTypeModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
    }
    getInfoWorkType(id: number) {
        return this.service.getWorkType(id).then(result => {
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
