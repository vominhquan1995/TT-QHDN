import { Component, OnInit } from '@angular/core';
import { JobService } from '@services/backend/job.service';
import { LocalService } from '@services/backend/local.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { ApplyService } from '@services/backend/apply.service';
import { CompanyService } from '@services/backend/company.service';
import { Router } from "@angular/router";

@Component({
  selector: 'hure-job-settings',
  templateUrl: './job-settings.component.html',
  styleUrls: ['./job-settings.component.scss']
})
export class JobSettingsComponent implements OnInit {
  jobs$: Observable<Job[]>
  role: string;
  constructor(private companySvc: CompanyService, private localSvc: LocalService, private applySvc: ApplyService, private router: Router) { }

  ngOnInit() {
    this.getJobsAsync()
  }
  getJobsAsync() {
    let userId = +this.localSvc.getAccountId()!;
    this.role = this.localSvc.getRole();
    if (userId && this.role == "Student") {
      this.jobs$ = this.applySvc.getAppliesOfUser(userId).pipe(share());
    }
    else if (userId && this.role == "Company") {
      //do company stuff
      this.jobs$ = this.companySvc.getJobsOfCompanyOfAccount(userId).pipe(share());
    }
  }
}
