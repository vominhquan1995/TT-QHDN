import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { JobGroupService } from '@services/backend/job-group.service';
import { WorkTypeService } from '@services/backend/work-type.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hure-jobs-filter',
  templateUrl: './jobs-filter.component.html',
  styleUrls: ['./jobs-filter.component.scss']
})
export class JobsFilterComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  jobG$: Subscription
  workTypes$: Subscription
  jobG: JobGroup[]
  workTypes: WorkType[]
  @Output() change: EventEmitter<JobsFilter> = new EventEmitter();
  data = []
  filterObj: {
    lowestSalary?: number,
    highestSalary?: number
  } = {}
  constructor() { }

  ngOnInit() {
  }

  filter() {

  }
}

interface JobsFilter {

}
