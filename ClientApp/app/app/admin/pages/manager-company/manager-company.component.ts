import { Component, OnInit, ViewChild } from "@angular/core";
import { Body } from "@angular/http/src/body";
import { AdminDialogComponent } from "@app/admin/shared/components/dialog/dialog.component";
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { CreateCompanyComponent } from "@app/admin/pages/manager-company/create-company/create-company.component";
import { EditCompanyComponent } from "@app/admin/pages/manager-company/edit-company/edit-company.component";
import { ManagerCompanyService } from "@app/admin/service/manager-company.service";
import { Page, Status_Job } from "@app/admin/shared/variables";
import { DetailCompanyComponent } from "@app/admin/pages/manager-company/detail-company/detail-company.component";
import { routerTransition } from "@app/admin/router.animations";
@Component({
    selector: 'manager-company',
    templateUrl: './manager-company.component.html',
    styleUrls: ['./manager-company.component.scss'],
    animations: [routerTransition()]
})
export class ManagerCompanyComponent implements OnInit {
    private currentPage: number = 1;
    private totalItem: number;
    private numberItemPage: number = Page.Number_Item_Default;
    private numberPageView: number = 5;
    private _data: any;
    private keySearch: string;
    private Status = Status_Job;
    //save list role
    private roles: any;
    private filterStatus: number = 0;
    private filterPartner: number = 0;
    //loading
    private isLoading: boolean = false;
    @ViewChild(CreateCompanyComponent) _modalCreateCompany: CreateCompanyComponent;
    @ViewChild(EditCompanyComponent) _modalEditCompany: EditCompanyComponent;
    @ViewChild(DetailCompanyComponent) _modalDetailCompany: DetailCompanyComponent;
    constructor(
        private _service: ManagerCompanyService,
        private _serviceDialog: AdminDialogService
    ) { }
    ngOnInit() {
        this.getData();
    }
    getData() {
        this.isLoading = true;
        this._data = undefined;
        let body = {};
        Object.assign(body, { NumberItemPage: this.numberItemPage });
        Object.assign(body, { CurrentPage: this.currentPage });
        if (this.keySearch) {
            Object.assign(body, { KeySearch: this.keySearch });
        }
        if (this.filterStatus == 1) {
            Object.assign(body, { Status: Status_Job.Active });
        } else if (this.filterStatus == 2) {
            Object.assign(body, { Status: Status_Job.Spending });
        }
        if (this.filterPartner != 0) {
            Object.assign(body, { IsPartner: this.filterPartner });
        }
        this._service.getCompanyPage(body).then(data => {
            this._data = data.data;
            this.totalItem = data.total;
            this.isLoading = false;
        })
    }
    pageChange() {
        this.getData();
    }
    openCreateUser() {
        this._modalCreateCompany.open();
    }
    openEdit(id: number) {
        this._modalEditCompany.open(id);
    }
    openDetail(item: Company) {
        this._modalDetailCompany.open(item);
    }
    showConfirmDelete(id: number) {
        this._serviceDialog.show('Xác Nhận', 'Bạn có xóa nhóm nghề này',
            () => {
                this._service.deleteCompany(id).then(result => {
                    this.getData();
                })
            }
        )
    }
    showConfirmActivate(id: number, item: Company) {
        this._serviceDialog.show('Xác Nhận', 'Bạn có muốn duyệt/ẩn doanh nghiệp này',
            () => {
                if (item.status == this.Status.Waiting) {
                    item.status = this.Status.Active;
                } else {
                    item.status = this.Status.Waiting;
                }
                this._service.activate(id, item).then(result => {
                    this.getData();
                })
            }
        )
    }
    public indexRow(i: number) {
        return (this.numberItemPage * (this.currentPage - 1)) + i + 1;
    }
}