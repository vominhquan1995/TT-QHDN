import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerWorkTypeComponent } from '@app/admin/pages/manager-work-type/manager-work-type.component';

const routes: Routes = [
    {
        path: '', component: ManagerWorkTypeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerWorkTypeRoutingModule {
}
