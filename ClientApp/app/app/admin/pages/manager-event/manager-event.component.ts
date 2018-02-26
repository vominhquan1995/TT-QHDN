import { Component, OnInit, ViewChild } from "@angular/core";
import { Body } from "@angular/http/src/body";
import { AdminDialogComponent } from "@app/admin/shared/components/dialog/dialog.component";
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { ManagerEventService } from "@app/admin/service/manager-event.service";
import { Page } from "@app/admin/shared/variables";
import { CreateEventComponent } from "@app/admin/pages/manager-event/create-event/create-event.component";
import { EditEventComponent } from "@app/admin/pages/manager-event/edit-event/edit-event.component";
import * as moment from 'moment';
import { routerTransition } from "@app/admin/router.animations";
@Component({
    selector: 'manager-Event',
    templateUrl: './manager-Event.component.html',
    styleUrls: ['./manager-Event.component.scss'],
    animations: [routerTransition()]
})
export class ManagerEventComponent implements OnInit {
    private currentPage: number = 1;
    private totalItem: number;
    private numberItemPage: number = Page.Number_Item_Default;
    private numberPageView: number = 5;
    private _data: EventItem[] = [];
    private keySearch: string;
    //save list role
    private roles: any;
    //filter status
    private filterStatus: number = 0;
    //loading
    private isLoading: boolean = false;
    @ViewChild(CreateEventComponent) _modalCreateEvent: CreateEventComponent;
    @ViewChild(EditEventComponent) _modalEditEvent: EditEventComponent;
    constructor(
        private _service: ManagerEventService,
        private _serviceDialog: AdminDialogService
    ) { }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.isLoading = true;
        this._data = [];
        let body = {};
        Object.assign(body, { NumberItemPage: this.numberItemPage });
        Object.assign(body, { CurrentPage: this.currentPage });
        if (this.keySearch) {
            Object.assign(body, { KeySearch: this.keySearch });
        }
        if (this.filterStatus != 0) {
            Object.assign(body, { IsActivated: this.filterStatus });
        }
        this._service.getEventPage(body).then(data => {
            this._data = data.data;
            this.totalItem = data.total;
            this._data.forEach(element => {
                let status = this.getStatusEvent(element.startTime, element.endTime)
                element.status = status.status;
                element.classColor = status.classColor;
                element.des = status.des;
            });
            this.isLoading = false;
        })
    }
    pageChange() {
        this.getData();
    }
    openCreateUser() {
        this._modalCreateEvent.open();
    }
    openEdit(id: number) {
        this._modalEditEvent.open(id);
    }
    showConfirmDelete(id: number) {
        this._serviceDialog.show('Xác Nhận', 'Bạn có xóa sự kiện này ?',
            () => {
                this._service.deleteEvent(id).then(result => {
                    this.getData();
                })
            }
        )
    }
    getStatusEvent(timeStart: string, timeEnd: string): { status: string, classColor: string, des: string } {
        let result = {
            status: '',
            classColor: '',
            des: '',
        }
        if (!moment(timeEnd).isAfter(new Date())) {
            result.status = "Hết hạn";
            result.classColor = "badge badge-danger";
            result.des = "Sự kiện đã diễn ra";
        } else if (moment(timeStart).isAfter(new Date())) {
            result.status = "Sắp diễn ra";
            result.classColor = "badge badge-info";
            result.des = "Sự kiện sắp được diễn ra";
        } else if (moment(timeStart).isSameOrBefore(new Date()) && moment(timeEnd).isAfter(new Date())) {
            result.status = "Đang diễn ra";
            result.classColor = "badge badge-success";
            result.des = "Sự kiện đang diễn ra";
        }
        return result;
    }
    public indexRow(i: number) {
        return (this.numberItemPage * (this.currentPage - 1)) + i + 1;
    }
}