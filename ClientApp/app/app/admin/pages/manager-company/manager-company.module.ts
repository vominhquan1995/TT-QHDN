import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { ManagerCompanyRoutingModule } from "@app/admin/pages/manager-company/manager-company-routing.module";
import { ManagerCompanyComponent } from "@app/admin/pages/manager-company/manager-company.component";
import { CreateCompanyComponent } from "@app/admin/pages/manager-company/create-company/create-company.component";
import { EditCompanyComponent } from "@app/admin/pages/manager-company/edit-company/edit-company.component";
import { DetailCompanyComponent } from "@app/admin/pages/manager-company/detail-company/detail-company.component";
@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerCompanyRoutingModule,
        FormsModule,
        ShareAdminModule
    ],
    declarations: [
        ManagerCompanyComponent,
        CreateCompanyComponent,
        EditCompanyComponent,
        DetailCompanyComponent
    ]
})
export class ManagerCompanyModule { }