import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables, Status_Job } from "@app/admin/shared/variables";
import { ManagerCompanyService } from '@app/admin/service/manager-company.service';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
    selector: 'create-company',
    templateUrl: './create-company.component.html',
    styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
    ngOnInit(): void {
    }
    closeResult: string;
    modalRef: any;
    private ImageURL: string;
    private isPartner: boolean;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerCompanyService,
    ) {
    }
    open() {
        let options: NgbModalOptions = {
            size: 'lg'
        };
        this.modalRef = this.modalService.open(this.content, options);
    }
    create(form: any) {
        let body = {
            name: form.value.name,
            shortName: form.value.shortName,
            Address: form.value.Address,
            Description: form.value.description,
            Scales: form.value.Scales,
            Representor: form.value.Representor,
            PhoneNumber: form.value.PhoneNumber,
            Email: form.value.Email,
            TaxCode: form.value.TaxCode,
            Website: form.value.Website,
            URLLogo: this.ImageURL,
            IsParner: this.isPartner,
            Status: Status_Job.Active,
        }
        this.service.createCompany(body).then(result => {
            if (result == true) {
                this.showToast('Thành công', 'success', true)
            } else {
                this.showToast('Lỗi xảy ra', 'danger', false)
            }
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
}
