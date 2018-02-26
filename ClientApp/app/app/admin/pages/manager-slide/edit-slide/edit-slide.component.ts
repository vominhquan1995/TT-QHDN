import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ManagerSlideService } from '@app/admin/service/manager-slide.service';
@Component({
    selector: 'edit-slide',
    templateUrl: './edit-slide.component.html',
    styleUrls: ['./edit-slide.component.scss']
})
export class EditSlideComponent implements OnInit {
    ngOnInit(): void {

    }
    closeResult: string;
    modalRef: any;
    SlideModel: any;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('edit') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerSlideService
    ) { }
    open(id: number) {
        this.getInfo(id).then(result => {
            this.SlideModel = result;
            this.modalRef = this.modalService.open(this.content);
        })
    }
    save() {
        this.service.updateSlide(this.SlideModel.id, this.SlideModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
    }
    getInfo(id: number) {
        return this.service.getSlide(id).then(result => {
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
