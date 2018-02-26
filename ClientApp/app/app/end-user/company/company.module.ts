import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyRoutes } from '@app/end-user/company/company.routing';
import { CompanyCardComponent } from '@app/end-user/company/components/company-card/company-card.component';
import { CompaniesContainerComponent } from '@app/end-user/company/components/companies-container/companies-container.component';
import { CompanyDetailComponent } from '@app/end-user/company/pages/company-detail/company-detail.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  imports: [
    CommonModule, CompanyRoutes,  SharedModule,CoreModule
  ],
  declarations: [CompanyComponent, CompanyCardComponent, CompaniesContainerComponent,CompanyDetailComponent]
})
export class CompanyModule { }