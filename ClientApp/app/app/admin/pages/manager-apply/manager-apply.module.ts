import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CreateUserComponent } from "@app/admin/pages/manager-user/create-user/create-user.component";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { EditUserComponent } from "@app/admin/pages/manager-user/edit-user/edit-user.component";
import { ManagerApplyComponent } from "@app/admin/pages/manager-apply/manager-apply.component";
import { ManagerApplyRoutingModule } from "@app/admin/pages/manager-apply/manager-apply-routing.module";
import { DetailApplyComponent } from "@app/admin/pages/manager-apply/detail-apply/detail-apply.component";

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerApplyRoutingModule,
        FormsModule,
        //add module dung chung
        ShareAdminModule
    ],
    declarations: [
        ManagerApplyComponent,
        DetailApplyComponent
    ]
})
export class ManagerApplyModule { }