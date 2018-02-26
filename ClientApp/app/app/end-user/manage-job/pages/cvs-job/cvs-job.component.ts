import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '@services/backend/job.service';
import { LocalService } from '@services/backend/local.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { ApplyService } from '@services/backend/apply.service';
import { CompanyService } from '@services/backend/company.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmService } from "@services/frontend/confirm.service";
import { AlertService } from "@services/frontend/alert.service";
import { DetailCvComponent } from '@app/end-user/manage-job/components/detail-cv/detail-cv.component';
import { UpdateProgressComponent } from '@app/end-user/manage-job/components/update-progress/update-progress.component';
@Component({
    selector: 'cv-of-job',
    templateUrl: './cvs-job.component.html',
    styleUrls: ['./cvs-job.component.scss']
})
export class CvOfJobComponent implements OnInit {
    account$: Observable<Account[]>
    companyId: any;
    private jobId: number;
    constructor(
        private companySvc: CompanyService,
        private router: Router,
        private confirmSvc: ConfirmService,
        private jobSvc: JobService,
        private toaster: AlertService,
        private route: ActivatedRoute) { }
    limit: number = 5;
    page: number = 1;
    listAccount: Account[] = [];
    @ViewChild(DetailCvComponent) _modalDetail: DetailCvComponent;
    @ViewChild(UpdateProgressComponent) _modalUpdateProgress: UpdateProgressComponent;
    ngOnInit() {
        this.route.params.subscribe(param => {
            this.jobId = param['id'];
            this.getData();
        })
    }
    getData() {
        this.account$ = this.jobSvc.getCvOfJob(+this.jobId!).pipe(share());
        this.account$.subscribe(data => {
            this.listAccount = data
        })
    }
    openDetail(item: Account) {
        this._modalDetail.open(item, this.jobId);
    }
    back() {
        this.router.navigate(['manage-jobs'])
    }
    openUpdateProgress(accountId: number) {
        let account = this.listAccount[this.listAccount.findIndex(x => x.id == accountId.toString())];
        let infoApply = account.applys[account.applys.findIndex(x => x.jobId == this.jobId)]
        this._modalUpdateProgress.open(accountId, this.jobId, infoApply.status);
    }
}
