import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { JobService } from '@services/backend/job.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: ActivatedRoute, private jobSvc: JobService) { }
  jobs$: Observable<Job[]>
  jobsHot$:Observable<Job[]>
  limit = 10
  page: number = 1;
  params: {
    keyword: string | null , jobGroupId?: number , workTypeId?:number
  }={keyword:""}
  ngOnInit() {
    this.jobs$ = this.router.paramMap
      .switchMap((params: ParamMap) => {
        this.params = { keyword: params.get('keyword')! || "", jobGroupId: +params.get('jobGroup')!||0, workTypeId:+params.get('workType')!||0 }
        return this.jobSvc.getSearchJobs(this.params.keyword!,this.params.jobGroupId!, this.params.workTypeId! ).pipe(share());
      })
      this.jobsHot$ = this.router.paramMap
      .switchMap((params: ParamMap) => {
        this.params = { keyword: params.get('keyword')! || "", jobGroupId: +params.get('jobGroup')!||0, workTypeId:+params.get('workType')!||0 }
        return this.jobSvc.getSearchJobsHot(this.params.jobGroupId!).pipe(share());
      })
  }

}
