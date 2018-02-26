import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerCompanyComponent } from '@app/admin/pages/manager-company/manager-company.component';
const routes: Routes = [
    {
        path: '', component: ManagerCompanyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerCompanyRoutingModule {
}
