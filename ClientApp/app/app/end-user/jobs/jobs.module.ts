import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { jobsRouter } from '@app/end-user/jobs/jobs.router';
import { SharedModule } from '@shared/shared.module';
import { JobsFilterComponent } from '@app/end-user/jobs/components/jobs-filter/jobs-filter.component';
import { JobDetailsComponent } from '@app/end-user/jobs/pages/job-details/job-details.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  imports: [
    CommonModule, jobsRouter, SharedModule, CoreModule
  ],
  declarations: [JobsComponent, JobsFilterComponent, JobDetailsComponent]
})
export class JobsModule { }