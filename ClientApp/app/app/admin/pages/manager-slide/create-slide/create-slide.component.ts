import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { ManagerSlideService } from '@app/admin/service/manager-slide.service';
@Component({
    selector: 'create-slide',
    templateUrl: './create-slide.component.html',
    styleUrls: ['./create-slide.component.scss']
})
export class CreateSlideComponent implements OnInit {
    ngOnInit(): void {
    }
    closeResult: string;
    modalRef: any;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    private isShow: boolean;
    private ImageURL: string;
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerSlideService,
    ) {
    }
    open() {
        this.modalRef = this.modalService.open(this.content);
    }
    create(form: any) {
        let body = {
            TitleParent: form.value.TitleParent,
            TitleChild: form.value.TitleChild,
            Index: form.value.Index,
            IsShow: this.isShow,
            ImageURL: this.ImageURL
        }
        this.service.createSlide(body).then(result => {
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
    statusChange(isShow: boolean) {
        this.isShow = isShow;
    }
}
