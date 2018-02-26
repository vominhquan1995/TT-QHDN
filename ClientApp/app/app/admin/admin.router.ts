import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginAdminComponent } from "./login/login.component";
import { AdminComponent } from "./admin.component";
import { AdminGuard } from "@guards/admin.guard";
import { CompanyGuard } from '@guards/company.guard';
const router: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './pages/home/home.module#HomeModule' },
            { path: 'manager-user', loadChildren: './pages/manager-user/manager-user.module#ManagerUserModule' },
            { path: 'manager-job-group', loadChildren: './pages/manager-job-group/manager-job-group.module#ManagerJobGroupModule' },
            { path: 'manager-work-type', loadChildren: './pages/manager-work-type/manager-work-type.module#ManagerWorkTypeModule' },
            { path: 'manager-company', loadChildren: './pages/manager-company/manager-company.module#ManagerCompanyModule' },
            { path: 'manager-job', loadChildren: './pages/manager-job/manager-job.module#ManagerJobModule' },
            { path: 'manager-event', loadChildren: './pages/manager-event/manager-event.module#ManagerEventModule' },
            { path: 'manager-apply', loadChildren: './pages/manager-apply/manager-apply.module#ManagerApplyModule' },
            { path: 'manager-slide', loadChildren: './pages/manager-slide/manager-slide.module#ManagerSlideModule' }
        ]
    },
    {
        path: 'login',
        component: LoginAdminComponent
    }
];

export const adminRouter = RouterModule.forChild(router);