import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '@services/backend/job.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Component({
  selector: 'hure-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  isIntership: boolean = false
  jobs: Job[]
  jobsHot$: Observable<Job[]>
  constructor(private route: ActivatedRoute, private jobSvc: JobService) { }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('internship')
    if (param == 'internship') {
      this.isIntership = true;
    }
    if (this.isIntership) {
      this.getInternAsync()
    } else {
      this.getJobAsync()
    }
  }
  page = 1;
  total: number;
  getInternAsync() {
    this.jobsHot$ = this.jobSvc.getHotInterns().pipe(share())
    this.jobSvc.getOnlyInterns(this.page).subscribe(data => {
      this.total = data.total;
      this.jobs = data.data;
    })
  }
  getJobAsync() {
    this.jobsHot$ = this.jobSvc.getHotJobs().pipe(share())
    this.jobSvc.getOnlyJobs(this.page).subscribe(data => {
      this.total = data.total;
      this.jobs = data.data;
    })
  }
  changePage(page: number) {
    this.page = page;
    this.jobSvc.getOnlyJobs(this.page).subscribe(data => {
      this.total = data.total;
      this.jobs = data.data;
    })
  }
}
