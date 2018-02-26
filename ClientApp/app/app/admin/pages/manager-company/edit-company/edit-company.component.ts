import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ManagerCompanyService } from '@app/admin/service/manager-company.service';
@Component({
    selector: 'edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
    ngOnInit(): void {

    }
    closeResult: string;
    modalRef: any;
    CompanyModel: Company;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('edit') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerCompanyService
    ) { }
    open(id: number) {
        this.getInfoCompany(id).then(result => {
            this.CompanyModel = result;
            let options: NgbModalOptions = {
                size: 'lg'
            };
            this.modalRef = this.modalService.open(this.content,options);
        })
    }
    save() {
        this.service.updateCompany(this.CompanyModel.id, this.CompanyModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
    }
    getInfoCompany(id: number) {
        return this.service.getCompany(id).then(result => {
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
