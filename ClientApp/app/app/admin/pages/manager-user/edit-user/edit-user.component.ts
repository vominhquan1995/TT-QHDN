import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
@Component({
    selector: 'admin-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    ngOnInit(): void {

    }
    closeResult: string;
    //save list role
    roles: any;
    //save list company;
    companies: any;
    //value role
    birthday: string;
    modalRef: any;
    userModel: any;
    //show dropdown company
    private isShowCompany: boolean = false;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    //value role
    roleSelected: number;
    companySelected: number;
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('edit') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private userService: ManagerUserService
    ) { }
    open(guid: string) {
        this.getInfoUser(guid).then(result => {
            this.userModel = result;
            this.userModel.dateOfBirth = moment(this.userModel.dateOfBirth).format("YYYY/MM/DD");
            this.getAllRole();
            this.getAllCompany();
            if (this.userModel.roleId == Variables.ID_ROLE_DOANH_NGHIEP) {
                this.isShowCompany = true;
            } else {
                this.isShowCompany = false;
            }
            let options: NgbModalOptions = {
                size: 'lg'
            };
            this.modalRef = this.modalService.open(this.content, options);
        })
    }
    timeChange(time: any) {
        this.userModel.dateOfBirth = time;
    }
    save() {
        this.userModel.roleId = this.roleSelected;
        this.userModel.companyId = this.companySelected;
        this.userService.updateUser(this.userModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
    }
    getInfoUser(guid: string) {
        return this.userService.getUser(guid).then(result => {
            return result
        })
    }
    getAllRole() {
        this.userService.getAllRole().then(result => {
            this.roles = result;
        })
    }
    roleChange(roleID: any) {
        this.roleSelected = roleID;
        if (this.roleSelected == Variables.ID_ROLE_DOANH_NGHIEP) {
            this
            this.isShowCompany = true;
        } else {
            this.isShowCompany = false;
        }
    }
    companyChange(companyId: any) {
        this.companySelected = companyId;
    }
    getAllCompany() {
        this.userService.getAllCompany().then(result => {
            this.companies = result;
        })
    }
    reset() {
        this.isShowCompany = false;
    }
    close() {
        this.reset();
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
