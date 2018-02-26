import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from '@services/backend/company.service';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'hure-brand-container',
    templateUrl: 'brand-container.component.html',
    styleUrls: ['./brand-container.component.scss']
})

export class BrandContainerComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.sub!.unsubscribe()
    }
    listBrand: any[]
    sub: Subscription
    constructor(private companySvc: CompanyService) { }

    ngOnInit() {
        this.sub = this.companySvc.getBrands().subscribe(s => {
            if (s) {
                this.listBrand = s!.map(o => {
                    return {
                        img: o.urlLogo,
                        text: o.name,
                        url: "company/"+ o.id
                    }
                });
                if (this.listBrand.length < 10) {
                    s.forEach(k => this.listBrand.push({
                        img: k.urlLogo,
                        text: k.name,
                        url: "company/"+ k.id
                    }))
                }
            }
        });
    }
}