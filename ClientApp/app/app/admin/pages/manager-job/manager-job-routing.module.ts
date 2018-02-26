import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerJobComponent } from '@app/admin/pages/manager-job/manager-job.component';
import { CreateJobComponent } from "@app/admin/pages/manager-job/create-job/create-job.component";
import { EditJobComponent } from '@app/admin/pages/manager-job/edit-job/edit-job.component';
const routes: Routes = [
    {
        path: '', component: ManagerJobComponent,
    },
    {
        path: 'create', component: CreateJobComponent
    },
    {
        path: 'edit/:id', component: EditJobComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerJobRoutingModule {
}
