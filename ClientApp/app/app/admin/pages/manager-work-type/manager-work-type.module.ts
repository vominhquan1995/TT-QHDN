import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { ManagerJobGroupComponent } from "@app/admin/pages/manager-job-group/manager-job-group.component";
import { CreateWorkTypeComponent } from "@app/admin/pages/manager-work-type/create-work-type/create-work-type.component";
import { EditWorkTypeComponent } from "@app/admin/pages/manager-work-type/edit-work-type/edit-work-type.component";
import { ManagerWorkTypeComponent } from "@app/admin/pages/manager-work-type/manager-work-type.component";
import { ManagerWorkTypeRoutingModule } from "@app/admin/pages/manager-work-type/manager-work-type-routing.module";
@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerWorkTypeRoutingModule,
        FormsModule,
        ShareAdminModule
    ],
    declarations: [
        ManagerWorkTypeComponent,
        CreateWorkTypeComponent,
        EditWorkTypeComponent
    ]
})
export class ManagerWorkTypeModule { }