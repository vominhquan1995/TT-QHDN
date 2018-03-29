import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { JobService } from '@services/backend/job.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Component({
    selector: 'hure-jobs-container',
    templateUrl: 'jobs-container.component.html',
    styleUrls: ['./jobs-container.component.scss']
})

export class JobsContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    
    ngOnDestroy(): void {
    }
    jobs$: Observable<Job[]> 
    @Input() jobsObserver: Observable<Job[]>// = new Observable<Job[]>(sub=> sub.next([]))
    @Input() title: string = "Việc làm";
    @Input() limit: number = 5;
    page:number=1;
    @Input() size:string = 'medium';
    @Input() paging:string = 'yes'
    constructor() {

    }
    ngOnInit() {
        
    }
    ngAfterViewInit():void{
        this.getDataAsync()
    }
    getDataAsync() {
       try{
        if (!this.jobs$) {
            this.jobs$ = this.jobsObserver.pipe(share())
        }
       }catch(err){
       }
    }

}