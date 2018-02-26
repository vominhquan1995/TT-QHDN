import { Component, OnInit } from '@angular/core';
import { CompanyService } from '@services/backend/company.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Component({
  selector: 'hure-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[]
  companiesPartner$: Observable<Company[]>
  keyword: string = "";
  page = 1;
  total: number;
  constructor(private companySvc: CompanyService) { }

  ngOnInit() {
    this.getDataAsync()
  }
  search() {
    this.page = 1;
    this.companySvc.getCompaniesPageSearch(this.keyword || '', this.page).subscribe(data => {
      this.total = data.itemCount;
      this.companies = data.data;
    })
  }
  changePage(page: any) {
    this.page = +page;
    this.companySvc.getCompaniesPage(this.page).subscribe(data => {
      this.total = data.itemCount;
      this.companies = data.data;
    })
  }
  getDataAsync() {
    this.companiesPartner$ = this.companySvc.getPartner().pipe(share())
    this.companySvc.getCompaniesPage(this.page).subscribe(data => {
      this.total = data.itemCount;
      this.companies = data.data;
    })
  }
}
