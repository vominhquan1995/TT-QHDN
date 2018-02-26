import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { ManagerJobGroupComponent } from "@app/admin/pages/manager-job-group/manager-job-group.component";
import { ManagerJobGroupRoutingModule } from "@app/admin/pages/manager-job-group/manager-job-group-routing.module";
import { EditJobGroupComponent } from "@app/admin/pages/manager-job-group/edit-job-group/edit-job-group.component";
import { CreateJobGroupComponent } from "@app/admin/pages/manager-job-group/create-job-group/create-job-group.component";
@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerJobGroupRoutingModule,
        FormsModule,
        ShareAdminModule
    ],
    declarations: [
        ManagerJobGroupComponent,
        CreateJobGroupComponent,
        EditJobGroupComponent
    ]
})
export class ManagerJobGroupModule { }