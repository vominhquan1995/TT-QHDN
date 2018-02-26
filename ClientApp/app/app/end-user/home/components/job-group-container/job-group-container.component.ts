import { Component, OnInit } from '@angular/core';
import { JobGroupService } from '@services/backend/job-group.service';
@Component({
    selector: 'hure-job-group-container',
    templateUrl: './job-group-container.component.html',
    styleUrls: ['./job-group-container.component.scss']
})
export class JobGroupComponent implements OnInit {
    constructor(private jobGroupSvc:JobGroupService){}
    jobGroups:JobGroup[]
    ngOnInit() { 
        this.jobGroupSvc.getJobs().subscribe(jobG=>this.jobGroups=jobG);
    }
}