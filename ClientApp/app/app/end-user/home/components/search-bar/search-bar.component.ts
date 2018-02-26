import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobGroupService } from '@services/backend/job-group.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkTypeService } from '@services/backend/work-type.service';

@Component({
  selector: 'hure-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.job$) {
      this.job$!.unsubscribe()
      this.work$!.unsubscribe()
      this.route$!.unsubscribe()
    }
  }
  keyword: string = ""
  jobs: JobGroup[]
  works: WorkType[]
  job$: Subscription
  work$: Subscription
  selectedJobG: number = 0
  selectedWorkT: number = 0
  route$:Subscription
  selectedWorkTItem:any
  selectedJobGItem:any
  constructor(private jobGSvc: JobGroupService, private router: Router, private workTSvc: WorkTypeService, private routeActive: ActivatedRoute, ) {
    this.job$ = this.jobGSvc.getJobs().subscribe(data => {
      this.jobs = data;
    });
    this.work$ = this.workTSvc.getWorkTypes().subscribe(data => this.works = data);
  }
  clear() {
    this.router.navigate(['/search', { jobGroup: 0, keyword: "", workType: 0 }])
    this.selectedWorkTItem = null
    this.selectedJobGItem = null
    this.keyword = ""
  }
  search() {
    this.router.navigate(['/search', { jobGroup: this.selectedJobG, keyword: this.keyword, workType: this.selectedWorkT }])
  }
  ngOnInit() {
    this.route$ = this.routeActive.paramMap.subscribe(s => {
      this.selectedJobG = +s.get('jobGroup')! || 0;
      this.selectedWorkT = +s.get('workType')! || 0;
      this.keyword = s.get('keyword') || "";
    })
  }
  onJobGroupChange(jobG: any|null) {
    this.selectedJobGItem = jobG;
    this.selectedJobG = jobG!.value||0;
  }
  onWorkTypeChange(work: any|null) {
    this.selectedWorkTItem = work;
    this.selectedWorkT = work!.value||0;
  }
}
