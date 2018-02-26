import { Component, Input, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
    selector: 'hure-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnChanges{
    ngOnChanges(changes: any): void {
    }
    /**
     *
     */
    constructor(private router: Router) {

    }
    @Input() data:any[]
    isActivated = false;
    keyword = "";
    onSubmit() {
        if (this.keyword.trim() != "") {
            let keyword = this.keyword.trim();
            this.isActivated = false;
            this.keyword = "";
            this.gotoSearchPage(keyword);
        }
    }
    gotoSearchPage(keyword: string) {
        this.router.navigate(['search'], { queryParams: { keyword: keyword } });
    }
}