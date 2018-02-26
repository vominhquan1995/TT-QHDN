import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '@services/backend/job.service';
import { CompanyService } from '@services/backend/company.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Component({
  selector: 'hure-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
  sub$: Subscription
  company: Company
  companyRelated$: Observable<any>
  jobRelated$:Observable<Job[]>
  constructor(private route: ActivatedRoute, private jobSvc: JobService, private companySvc: CompanyService) { }
  ngOnInit() {
    this.route.params.subscribe(param => {
      let companyid = param['id']
      this.sub$ = this.companySvc.getCompany(+companyid!).subscribe(result => {
        this.company = result;
        this.companyRelated$ = this.companySvc.getCompanies().pipe(share())
        this.jobRelated$ = this.companySvc.getJobOfCompany(this.company.id).pipe(share())
      })
    })
  }

}
