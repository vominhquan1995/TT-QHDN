import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUserService } from '@app/admin/service/manager-user.service';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import * as moment from 'moment';
@Component({
    selector: 'create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
    ngOnInit(): void {
        this.getAllRole();
        this.getAllCompany();
    }
    closeResult: string;
    //save list role
    roles: any;
    //save list company;
    companies: any;
    //value role
    roleSelected: number;
    //value company
    companySelected: number;
    birthday: string;
    sex: boolean;
    isActivated: boolean;
    modalRef: any;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    //show dropdown company
    private isShowCompany: boolean = false;
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private userService: ManagerUserService,
    ) {

    }
    open() {
        let options: NgbModalOptions = {
            size: 'lg'
        };
        this.modalRef = this.modalService.open(this.content,options);
    }
    timeChange(time: any) {
        this.birthday = time;
    }
    sexChange(sex: boolean) {
        this.sex = sex;
    }
    statusChange(IsActivated: boolean) {
        this.isActivated = IsActivated;
    }
    roleChange(roleID: any) {
        this.roleSelected = roleID;
        if (this.roleSelected == Variables.ID_ROLE_DOANH_NGHIEP) {
            this.isShowCompany = true;
        } else {
            this.isShowCompany = false;
        }
    }
    companyChange(companyId: any) {
        this.companySelected = companyId;
    }
    getAllRole() {
        this.userService.getAllRole().then(result => {
            this.roles = result;
        })
    }
    getAllCompany() {
        this.userService.getAllCompany().then(result => {
            this.companies = result;
        })
    }
    create(form: any) {
        if (this.roleSelected == undefined) {
            this.showToast('Chưa chọn phân quyền', 'warning', false)
            return;
        } else if (this.sex == undefined) {
            this.showToast('Chưa chọn giới tính', 'warning', false)
            return;
        } else if (parseInt(moment(new Date()).year().toString()) - parseInt(moment(this.birthday).year().toString()) < 17) {
            this.showToast('Người dùng phải trên 17 tuổi', 'warning', false)
            return;
        } else {
            let body = {
                Email: form.value.Email,
                Username: form.value.Username,
                FullName: form.value.FullName,
                Mssv: form.value.Mssv,
                Department: form.value.Department,
                Sex: this.sex,
                DateOfBirth: this.birthday,
                RoleId: this.roleSelected,
                IsActivated: this.isActivated,
                CompanyId: this.companySelected
            }
            this.userService.createUser(body).then(result => {
                if (result == true) {
                    this.showToast('Thành công', 'success', true)
                } else {
                    this.showToast('Tài khoản đã tồn tại', 'danger', false)
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
                this.close()
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
        this.isShowCompany = false;
    }
}
