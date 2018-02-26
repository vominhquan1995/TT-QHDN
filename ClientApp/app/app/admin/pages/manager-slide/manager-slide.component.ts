import { Component, OnInit, ViewChild } from "@angular/core";
import { Body } from "@angular/http/src/body";
import { AdminDialogComponent } from "@app/admin/shared/components/dialog/dialog.component";
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { ManagerSlideService } from "@app/admin/service/manager-slide.service";
import { CreateSlideComponent } from "@app/admin/pages/manager-slide/create-slide/create-slide.component";
import { EditSlideComponent } from "@app/admin/pages/manager-slide/edit-slide/edit-slide.component";
import { routerTransition } from "@app/admin/router.animations";
@Component({
    selector: 'manager-slide',
    templateUrl: './manager-slide.component.html',
    styleUrls: ['./manager-slide.component.scss'],
    animations: [routerTransition()]
})
export class ManagerSlideComponent implements OnInit {
    private totalItem: number;
    private _data: any;
    @ViewChild(CreateSlideComponent) _modalCreate: CreateSlideComponent;
    @ViewChild(EditSlideComponent) _modalEdit: EditSlideComponent;
    constructor(
        private _service: ManagerSlideService,
        private _serviceDialog: AdminDialogService
    ) { }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this._data = undefined;
        this._service.gets().then(data => {
            this._data = data;
            this.totalItem = this._data.length;
        })
    }
    pageChange() {
        this.getData();
    }
    openCreateUser() {
        this._modalCreate.open();
    }
    openEdit(id: number) {
        this._modalEdit.open(id);
    }
    showConfirmDelete(id: number) {
        this._serviceDialog.show('Xác Nhận', 'Bạn có xóa nhóm nghề này',
            () => {
                this._service.deleteSlide(id).then(result => {
                    this.getData();
                })
            }
        )
    }
}