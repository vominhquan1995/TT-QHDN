import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EndUserComponent } from '@app/end-user/end-user.component';
import { ErrorComponent } from '@app/end-user/error/error.component';
import { CompanyGuard } from "@guards/company.guard";
import { CreateJobComponent } from "@app/admin/pages/manager-job/create-job/create-job.component";
const router: Routes = [
    {
        path: '',
        component: EndUserComponent,
        children: [
            {
                path: '', loadChildren: './home/home.module#HomeModule'
            },
            {
                path: 'about', loadChildren: './introduce/introduce.module#IntroduceModule'
            },
            {
                path: 'contact', loadChildren: './contact/contact.module#ContactModule'
            },
            {
                path: 'events', loadChildren: './event/event.module#EventModule'
            }, {
                path: 'jobs', loadChildren: './jobs/jobs.module#JobsModule'
            },
            {
                path: 'search', loadChildren: './search/search.module#SearchModule'
            }, {
                path: 'settings', loadChildren: './manage-account/manage-account.module#ManageAccountModule'
            },
            {
                path: 'company', loadChildren: './company/company.module#CompanyModule'
            },{
                path:'manage-jobs',loadChildren:'./manage-job/manage-job.module#ManageJobModule'
            }

            // {
            //     path: '**', component: ErrorComponent
            // }
        ]
    }
];

export const endUserRouter = RouterModule.forChild(router);