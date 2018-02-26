import { Routes, RouterModule } from '@angular/router';
import { ManageAccountComponent } from '@app/end-user/manage-account/manage-account.component';
import { AccountSettingsComponent } from '@app/end-user/manage-account/pages/account-settings/account-settings.component';
import { JobSettingsComponent } from '@app/end-user/manage-account/pages/job-settings/job-settings.component';
import { CompanyGuard } from "@guards/company.guard";
import { AuthGuard } from '@guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ManageAccountComponent, 
    children: [{
      path: '',canActivate:[AuthGuard], component: AccountSettingsComponent
    },
    {
      path: 'jobs',canActivate:[AuthGuard], component: JobSettingsComponent
    },
    ]
  }
];

export const ManageAccountRoutes = RouterModule.forChild(routes);
