import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '@services/backend/job.service';
import { LocalService } from '@services/backend/local.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { ApplyService } from '@services/backend/apply.service';
import { CompanyService } from '@services/backend/company.service';
import { Router } from "@angular/router";
import { ConfirmService } from "@services/frontend/confirm.service";
import { AlertService } from "@services/frontend/alert.service";
import { ModalCreateJobComponent } from '@app/end-user/manage-job/components/create-job/create-job.component';
import { ModalEditJobComponent } from '@app/end-user/manage-job/components/edit-job/edit-job.component';
import { STATUS } from '@shared/_variables';
@Component({
    selector: 'hure-jobs-company-manager',
    templateUrl: './jobs-company-manager.component.html',
    styleUrls: ['./jobs-company-manager.component.scss']
})
export class JobCompanyManagerComponent implements OnInit {
    jobs$: Observable<Job[]>
    companyId: any;
    //define status job
    private readonly spending = STATUS.SPENDING;
    constructor(
        private companySvc: CompanyService,
        private localSvc: LocalService,
        private router: Router,
        private confirmSvc: ConfirmService,
        private jobSvc: JobService,
        private toaster: AlertService) { }
    limit: number = 5;
    page: number = 1;
    @ViewChild(ModalCreateJobComponent) _modalCreateJob: ModalCreateJobComponent;
    @ViewChild(ModalEditJobComponent) _modalEditJob: ModalEditJobComponent;
    ngOnInit() {
        this.getJobsAsync()
    }
    getJobsAsync() {
        let userId = +this.localSvc.getAccountId()!;
        this.companyId = this.localSvc.getCompanyId();
        this.jobs$ = this.companySvc.getJobsOfCompanyOfAccount(userId).pipe(share());
    }
    goToReview(id: number) {
        this.router.navigate(['jobs', 'details', id]);
    }
    openCreate() {
        this._modalCreateJob.open(this.companyId);
    }
    deleteJob(id: number) {
        this.confirmSvc.showConfirm(
            "Xác nhận xóa",
            `Bạn có chắc chắn xóa tin này`,
            [{
                text: "Đồng ý", func: () => {
                    this.jobSvc.deleteJob(id).then(resulst => {
                        if (resulst) {
                            this.getJobsAsync();
                            this.toaster.show('Thông báo', "Xóa thành công")
                        } else {
                            this.toaster.show('Thông báo', 'Xóa không thành công', 'warning')
                        }
                    })
                }
            }])
    }
    openEdit(id: number) {
        this._modalEditJob.open(id)
    }
    goToCvs(idJob: number) {
        this.router.navigate(['manage-jobs', 'cvs-job', idJob]);
    }
}
