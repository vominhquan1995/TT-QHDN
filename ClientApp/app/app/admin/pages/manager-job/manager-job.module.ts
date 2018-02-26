import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { ManagerJobRoutingModule } from "@app/admin/pages/manager-job/manager-job-routing.module";
import { ManagerJobComponent } from "@app/admin/pages/manager-job/manager-job.component";
import { CreateJobComponent } from "@app/admin/pages/manager-job/create-job/create-job.component";
import { EditJobComponent } from "@app/admin/pages/manager-job/edit-job/edit-job.component";
import { DetailJobComponent } from "@app/admin/pages/manager-job/detail-job/detail-job.component";
@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerJobRoutingModule,
        FormsModule,
        //add module dung chung
        ShareAdminModule
    ],
    declarations: [
        ManagerJobComponent,
        CreateJobComponent,
        EditJobComponent,
        DetailJobComponent
    ]
})
export class ManagerJobModule { }