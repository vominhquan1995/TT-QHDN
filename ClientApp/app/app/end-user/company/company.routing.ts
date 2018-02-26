import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from '@app/end-user/company/company.component';
import { CompanyDetailComponent } from '@app/end-user/company/pages/company-detail/company-detail.component';

const routes: Routes = [
  {
    path: '', component: CompanyComponent
  },
  {
    path:':id', component:CompanyDetailComponent
  }
];

export const CompanyRoutes = RouterModule.forChild(routes);
