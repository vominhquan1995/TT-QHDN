import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerSlideComponent } from '@app/admin/pages/manager-slide/manager-slide.component';
const routes: Routes = [
    {
        path: '', component: ManagerSlideComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerSlideRoutingModule {
}
