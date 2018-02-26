import { Routes, RouterModule } from '@angular/router';
import { CompanyGuard } from '@guards/company.guard';
import { CvOfJobComponent } from '@app/end-user/manage-job/pages/cvs-job/cvs-job.component';
import { JobCompanyManagerComponent } from '@app/end-user/manage-job/pages/jobs-company-manager/jobs-company-manager.component';
import { ManageJobComponent } from '@app/end-user/manage-job/manage-job.component';

const routes: Routes = [
  {
    path: '', component: ManageJobComponent, children: [
      {
        path: '', canActivate: [CompanyGuard], component: JobCompanyManagerComponent
      },
      {
        path: 'cvs-job/:id', canActivate: [CompanyGuard], component: CvOfJobComponent
      }
    ]
  }
];

export const ManageJobRoutes = RouterModule.forChild(routes);
