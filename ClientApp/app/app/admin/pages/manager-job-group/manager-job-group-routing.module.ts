import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerJobGroupComponent } from '@app/admin/pages/manager-job-group/manager-job-group.component';

const routes: Routes = [
    {
        path: '', component: ManagerJobGroupComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerJobGroupRoutingModule {
}
