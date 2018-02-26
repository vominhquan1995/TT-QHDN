import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { JobsComponent } from '@app/end-user/jobs/jobs.component';
import { JobDetailsComponent } from '@app/end-user/jobs/pages/job-details/job-details.component';

const router: Routes = [
    {
        path: 'list/:internship',
        component: JobsComponent
    },{
        path: 'list',
        component: JobsComponent
    },{
        path:'details/:id',
        component:JobDetailsComponent
    }
];

export const jobsRouter = RouterModule.forChild(router);
