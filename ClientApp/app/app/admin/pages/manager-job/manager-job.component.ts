import { Component, OnInit, ViewChild } from "@angular/core";
import { Body } from "@angular/http/src/body";
import { noUndefined } from "@angular/compiler/src/util";
import { AdminDialogComponent } from "@app/admin/shared/components/dialog/dialog.component";
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { ManagerJobService } from "@app/admin/service/manager-job.service";
import * as moment from 'moment';
import { DetailJobComponent } from "@app/admin/pages/manager-job/detail-job/detail-job.component";
import { Status_Job, Type_Alert, Page } from "@app/admin/shared/variables";
import { stagger } from "@angular/animations/src/animation_metadata";
import { Router } from "@angular/router";
import { AlertService } from "@services/frontend/alert.service";
import { routerTransition } from "@app/admin/router.animations";
@Component({
    selector: 'manager-job',
    templateUrl: './manager-job.component.html',
    styleUrls: ['./manager-job.component.scss'],
    animations: [routerTransition()]
})
export class ManagerJobComponent implements OnInit {
    private currentPage: number = 1;
    private totalItem: number;
    private numberItemPage: number = Page.Number_Item_Default;
    private numberPageView: number = 5;
    private _data: Job[] = [];
    private keySearch: string;
    private filterStatus: number = 0;
    private isReport: boolean = false;
    //save list company;
    companies: any;
    //save list work typ;
    worktypes: any;
    //save list company;
    jobgroups: any;
    //value work type
    worktypeSelected: number;
    //value company
    // companySelected: number;
    // value job group
    jobgroupSelected: number;
    //loading
    private isLoading: boolean = false;
    @ViewChild(DetailJobComponent) _detailModal: DetailJobComponent;
    constructor(
        private _serviceManagerJob: ManagerJobService,
        private _serviceDialog: AdminDialogService,
        private router: Router,
        private toast: AlertService
    ) { }
    ngOnInit() {
        this.getData();
        this.getAllWorkType();
        this.getAllJobGroup();
        // this.getAllCompany();
    }
    getAllWorkType() {
        this._serviceManagerJob.getAllWorkType().then(result => {
            this.worktypes = result;
        })
    }
    getAllJobGroup() {
        this._serviceManagerJob.getAllJobGroup().then(result => {
            this.jobgroups = result;
        })
    }
    // getAllCompany() {
    //     this._serviceManagerJob.getAllCompany().then(result => {
    //         this.companies = result;
    //     })
    // }
    jobgroupChange(jobgroupID: any) {
        this.jobgroupSelected = jobgroupID;
        this.getData();
    }
    worktypeChange(worktypeID: any) {
        this.worktypeSelected = worktypeID;
        this.getData();
    }
    // companyChange(companyId: any) {
    //     this.companySelected = companyId;
    //     this.getData();
    // }
    getData() {
        this.isLoading = true;
        this._data = [];
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
        if (this.jobgroupSelected) {
            Object.assign(body, { JobGroup_Id: this.jobgroupSelected });
        }
        // if (this.companySelected) {
        //     Object.assign(body, { Company_Id: this.companySelected });
        // }
        if (this.worktypeSelected) {
            Object.assign(body, { WorkType_Id: this.worktypeSelected });
        }
        this._serviceManagerJob.getJobsPage(body).then(data => {
            this._data = data.data;
            this.totalItem = data.total;
            this._data.forEach(element => {
                if (element.status == Status_Job.Spending) {
                    element.status = Status_Job.Spending;
                } else {
                    if (!moment(element.deadlineApply).isAfter(new Date())) {
                        element.status = Status_Job.Timeout;
                    }
                }
                let status = this.getStatusJob(element.status)
                element.status = status.status;
                element.classColor = status.classColor;
                element.des = status.des;
                element.isShowActivate = status.isShowActivate;
            });
            this.isLoading = false;
        })
    }
    pageChange() {
        this.getData();
    }
    viewDetail(item: Job) {
        this._detailModal.open(item);
    }
    getStatusJob(status: string): { status: string, classColor: string, des: string, isShowActivate: boolean } {
        let result = {
            status: '',
            classColor: '',
            des: '',
            isShowActivate: false
        }
        if (status == Status_Job.Timeout) {
            result.status = "Hết hạn";
            result.classColor = "badge badge-danger";
            result.des = "Công việc đã qua thời gian tuyển dụng";
        } else if (status == Status_Job.Spending) {
            result.status = "Chờ duyệt";
            result.classColor = "badge badge-info";
            result.des = "Công việc này chờ xét duyệt";
            result.isShowActivate = true;
        } else {
            result.status = "Hoạt động";
            result.classColor = "badge badge-success";
            result.des = "Công việc đang tuyển";
        }
        return result;
    }
    goToCreate() {
        this.router.navigate(['admin/manager-job/create']);
    }
    goToEdit(id: number) {
        this.router.navigate([`admin/manager-job/edit/${id}`]);
    }
    deleteJob(id: number) {
        this._serviceDialog.show('Xác nhận', 'Bạn có chắn chắc xóa tin này', () => {
            this._serviceManagerJob.deleteJob(id).then(resuls => {
                if (resuls == true) {
                    this.getData();
                    this.toast.show('Thông báo', 'Xóa thành công')
                } else {
                    this.toast.show('Thông báo', 'Xóa không thành công', Type_Alert.DANGER)
                }
            })
        })
    }
    activate(item: Job) {
        this._serviceDialog.show('Xác Nhận', 'Bạn có muốn kích hoạt tin tuyển dụng này ?',
            () => {
                item.status = Status_Job.Active;
                this._serviceManagerJob.activate(item.id, item).then(result => {
                    this.getData();
                })
            }
        )
    }
    public indexRow(i: number) {
        return (this.numberItemPage * (this.currentPage - 1)) + i + 1;
    }
    changeModeView() {
        if (this.isReport) {
            this.isReport = false;
        } else {
            this.isReport = true;
        }

    }
}