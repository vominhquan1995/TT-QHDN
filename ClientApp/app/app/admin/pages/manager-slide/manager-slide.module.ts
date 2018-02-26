import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { ManagerSlideRoutingModule } from "@app/admin/pages/manager-slide/manager-slide-routing.module";
import { CreateSlideComponent } from "@app/admin/pages/manager-slide/create-slide/create-slide.component";
import { EditSlideComponent } from "@app/admin/pages/manager-slide/edit-slide/edit-slide.component";
import { ManagerSlideComponent } from "@app/admin/pages/manager-slide/manager-slide.component";
@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerSlideRoutingModule,
        FormsModule,
        ShareAdminModule
    ],
    declarations: [
        ManagerSlideComponent,
        CreateSlideComponent,
        EditSlideComponent
    ]
})
export class ManagerSlideModule { }