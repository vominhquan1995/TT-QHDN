import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerEventComponent } from "@app/admin/pages/manager-event/manager-event.component";
const routes: Routes = [
    {
        path: '', component: ManagerEventComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerEventRoutingModule {
}
