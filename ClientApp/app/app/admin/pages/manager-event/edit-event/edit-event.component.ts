import { Component, ViewChild, TemplateRef, ViewChildren, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Variables, Type_Alert } from "@app/admin/shared/variables";
import { ManagerEventService } from '@app/admin/service/manager-event.service';
import { AdminCkeditor } from "@app/admin/shared/components/ckeditor/ckeditor.component";
@Component({
    selector: 'edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
    ngOnInit(): void {

    }
    closeResult: string;
    modalRef: any;
    EventModel: EventItem;
    //luu loi
    private error = {
        mess: '',
        type: ''
    }
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    @ViewChild('edit') content: TemplateRef<any>;
    constructor(
        private modalService: NgbModal,
        private service: ManagerEventService
    ) { }
    open(id: number) {
        this.getInfoEvent(id).then(result => {
            this.EventModel = result;
            // this.EventModel.startTime = moment(this.EventModel.startTime).format("YYYY/MM/DD");
            // this.EventModel.endTime = moment(this.EventModel.endTime).format("YYYY/MM/DD");
            let options: NgbModalOptions = {
                size: 'lg'
            };
            this.modalRef = this.modalService.open(this.content, options);
        })
    }
    save() {
        // if(moment(this.EventModel.endTime).isBefore(this.EventModel.startTime)) {
        //     this.error.type = "warning";
        //     this.error.mess = "Thời gian kết thúc phải sau thời gian bắt đầu";
        // } else {
        this.service.updateEvent(this.EventModel.id, this.EventModel).then(result => {
            if (result == true) {
                this.showToast('Cập nhật thành công', Type_Alert.SUCCESS, true)
            } else {
                this.showToast('Cập nhật không thành công', Type_Alert.DANGER, false)
            }
        })
        // }

    }
    getInfoEvent(id: number) {
        return this.service.getEvent(id).then(result => {
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
    // timeChangeStart(time: any) {
    //     this.EventModel.startTime = time;
    // }
    // timeChangeEnd(time: any) {
    //     this.EventModel.endTime = time;
    // }
}
