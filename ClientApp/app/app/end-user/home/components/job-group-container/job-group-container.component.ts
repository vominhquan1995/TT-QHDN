import { Component, OnInit } from '@angular/core';
import { JobGroupService } from '@services/backend/job-group.service';
import { Value_Number } from '@shared/_variables';
@Component({
    selector: 'hure-job-group-container',
    templateUrl: './job-group-container.component.html',
    styleUrls: ['./job-group-container.component.scss']
})
export class JobGroupComponent implements OnInit {
    constructor(private jobGroupSvc: JobGroupService) { }
    jobGroups: JobGroup[];
    private number_item = Value_Number.Number_Job_Group;
    ngOnInit() {
        this.jobGroupSvc.getJobs().subscribe(jobG => this.jobGroups = jobG);
    }
}