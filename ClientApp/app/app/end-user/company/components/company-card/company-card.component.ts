import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hure-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() company: Company;
  @Input() size: string = 'medium';
  apply() {
      if (this.company) {
          this.router.navigate(['company', this.company ? this.company.id.toString() : 1]);
      }
  }
  constructor(private router:Router) { }

  ngOnInit() {
  }

}
