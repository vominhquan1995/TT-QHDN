import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Component({
  selector: 'hure-companies-container',
  templateUrl: './companies-container.component.html',
  styleUrls: ['./companies-container.component.scss']
})
export class CompaniesContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getDataAsync();
  }
  getDataAsync(){
    if(!this.companies$){
      this.companies$ = this.companiesObserver.pipe(share())
    }
  }
  companies$: Observable<Company[]> 
  @Input() companiesObserver: Observable<Company[]>// = new Observable<Job[]>(sub=> sub.next([]))
  @Input() title: string = "Doanh nghiệp";
  @Input() limit: number = 5;
  page:number=1;
  @Input() size:string = 'medium';
  @Input() paging:string = 'yes'
}
