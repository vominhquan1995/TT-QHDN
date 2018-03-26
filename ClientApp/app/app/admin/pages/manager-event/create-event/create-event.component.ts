import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlertComponent } from '@app/admin/shared/components/alert/alert.component';
import { Variables } from "@app/admin/shared/variables";
import { ManagerEventService } from '@app/admin/service/manager-event.service';
import * as moment from 'moment';
@Component({
    selector: 'create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
    ngOnInit(): void {
    }
    closeResult: string;
    modalRef: any;
    private ImageURL: string;
    private contentHtml: string;
    // private timeStart: string;
    // private timeEnd: string;
    //luu loi
    private error = {
        mess: '',
        type: 'danger'
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('content') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerEventService,
    ) {
    }
    open() {
        let options: NgbModalOptions = {
            size: 'lg'
        };
        this.modalRef = this.modalService.open(this.content, options);
    }
    create(form: any) {
        // if (!moment(this.timeStart).isAfter(new Date())) {
        //     this.error.type = "warning";
        //     this.error.mess = "Thời gian bắt đầu phải sau hôm nay";
        // } else if (moment(this.timeEnd).isBefore(this.timeStart)) {
        //     this.error.type = "warning";
        //     this.error.mess = "Thời gian kết thúc phải sau thời gian bắt đầu";
        // } else {
        let body = {
            Name: form.value.Name,
            Title: form.value.Title,
            ShortDescription: form.value.ShortDescription,
            ContentHtml: this.contentHtml,
            Place: form.value.Place,
            LinkRegister: form.value.LinkRegister,
            ImageURL: this.ImageURL,
            RegisterTime: form.value.RegisterTime,
            Time: form.value.Time
        }
        this.service.createEvent(body).then(result => {
            if (result == true) {
                this.showToast('Thành công', 'success', true)
            } else {
                this.showToast('Lỗi xảy ra', 'danger', false)
            }
        })
        // }
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
    contentHtmlChange(body: string) {
        this.contentHtml = body;
    }
}
