import { Component, OnInit, ViewChild } from "@angular/core";
import { Body } from "@angular/http/src/body";
import { noUndefined } from "@angular/compiler/src/util";
import { AdminDialogComponent } from "@app/admin/shared/components/dialog/dialog.component";
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { Page, Status_Apply } from "@app/admin/shared/variables";
import { AlertService } from "@services/frontend/alert.service";
import { ManagerApplyService } from "@app/admin/service/manager-apply.service";
import { DetailApplyComponent } from "@app/admin/pages/manager-apply/detail-apply/detail-apply.component";
import { routerTransition } from "@app/admin/router.animations";
@Component({
    selector: 'manager-apply',
    templateUrl: './manager-apply.component.html',
    styleUrls: ['./manager-apply.component.scss'],
    animations: [routerTransition()]
})
export class ManagerApplyComponent implements OnInit {
    private currentPage: number = 1;
    private totalItem: number = 0;
    private numberItemPage: number = Page.Number_Item_Default;
    private numberPageView: number = 5;
    private _data: Apply[] = [];
    private filterStatus: number = 0;
    private filterCompany: number;
    private keySearch: string;
    //save list company;
    companies: any;
    //loading
    private isLoading: boolean = false;
    @ViewChild(DetailApplyComponent) _modalDetail: DetailApplyComponent;
    constructor(
        private _service: ManagerApplyService,
        private _serviceDialog: AdminDialogService,
        private _toast: AlertService
    ) { }
    ngOnInit() {
        this.getAllCompany();
        this.getData();
    }
    getData() {
        this.isLoading = true;
        this._data = [];
        let body = {};
        Object.assign(body, { NumberItemPage: this.numberItemPage });
        Object.assign(body, { CurrentPage: this.currentPage });
        if (this.filterStatus == 1) {
            Object.assign(body, { Status: Status_Apply.Waiting });
        }
        if (this.filterStatus == 2) {
            Object.assign(body, { Status: Status_Apply.Seen });
        }
        if (this.filterStatus == 3) {
            Object.assign(body, { Status: Status_Apply.Interview });
        }
        if (this.filterStatus == 4) {
            Object.assign(body, { Status: Status_Apply.Passed });
        }
        if (this.filterStatus == 5) {
            Object.assign(body, { Status: Status_Apply.Failed });
        }
        if (this.filterCompany) {
            Object.assign(body, { Company_Id: this.filterCompany });
        }
        if (this.keySearch) {
            Object.assign(body, { KeySearch: this.keySearch });
        }
        this._service.getApplyPage(body).then(data => {
            this._data = data.data;
            this._data.forEach(element => {
                let status = this.getStatus(element.status)
                element.status = status.status;
                element.classColor = status.classColor;
                element.des = status.des;
            });
            this.totalItem = data.total;
            this.isLoading = false;
        })
    }
    pageChange() {
        this.getData();
    }
    showConfirmDelete(accountId: number, jobId: number) {
        this._serviceDialog.show('Xác Nhận', 'Bạn có xóa tài khoản này',
            () => {
                this._service.deleteApply(accountId, jobId).then(result => {
                    this._toast.show('Thông Báo', 'Xóa hồ sơ thành công', 'warning');
                    this.getData();
                })
            }
        )
    }
    filterCompanyChanged(idCompany: any) {
        this.filterCompany = idCompany;
        this.getData();
    }
    getAllCompany() {
        this._service.getAllCompany().then(result => {
            this.companies = result;
        })
    }
    public indexRow(i: number) {
        return (this.numberItemPage * (this.currentPage - 1)) + i + 1;
    }
    getStatus(status: string): { status: string, classColor: string, des: string, isShowActivate: boolean } {
        let result = {
            status: '',
            classColor: '',
            des: '',
            isShowActivate: false
        }
        if (status == Status_Apply.Waiting) {
            result.status = "Đang chờ";
            result.classColor = "badge badge-secondary";
            result.des = "Sinh viên đã nộp hồ sơ chờ doanh nghiệp duyệt";
        } else if (status == Status_Apply.Seen) {
            result.status = "Đã xem";
            result.classColor = "badge badge-primary";
            result.des = "Hồ sơ đã được xem xét";
            result.isShowActivate = true;
        } else if (status == Status_Apply.Interview) {
            result.status = "Phỏng vấn";
            result.classColor = "badge badge-info";
            result.des = "Hồ sơ chờ phỏng vấn";
            result.isShowActivate = true;
        } else if (status == Status_Apply.Passed) {
            result.status = "Được nhận";
            result.classColor = "badge badge-success";
            result.des = "Ứng viên đã được tuyển";
            result.isShowActivate = true;
        } else {
            result.status = "Thất bại";
            result.classColor = "badge badge-danger";
            result.des = "Ứng viên không đủ điều kiện";
        }
        return result;
    }
    openDetail(accountId: number, jobId: number) {
        this._modalDetail.open(accountId, jobId);
    }
}