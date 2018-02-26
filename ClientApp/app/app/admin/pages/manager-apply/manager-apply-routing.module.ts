import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerApplyComponent } from "@app/admin/pages/manager-apply/manager-apply.component";

const routes: Routes = [
    {
        path: '', component: ManagerApplyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerApplyRoutingModule {
}
