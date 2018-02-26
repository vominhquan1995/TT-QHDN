import { NgModule } from '@angular/core';
import { adminRouter } from "./admin.router";
import { AdminComponent } from "./admin.component";
import { FormsModule } from "@angular/forms";
import { CoreModule } from '@core/core.module';
import { UIModule } from '@ui/ui.module';
import { HttpModule } from "@angular/http";
import { AdminGuard } from "@guards/admin.guard";
import { LoginAdminComponent } from '@app/admin/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from "@app/admin/layout/layout.module";
import { HeaderAdminComponent } from "@app/admin/layout/header/header.component";
import { ManagerUserService } from "@app/admin/service/manager-user.service";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { AdminDialogService } from "@app/admin/service/front-end/dialog.service";
import { ManagerJobGroupService } from '@app/admin/service/manager-job-group.service';
import { UploadFileService } from '@app/admin/service/front-end/upload-file.service';
import { ManagerWorkTypeService } from '@app/admin/service/manager-work-type.service';
import { ManagerCompanyService } from '@app/admin/service/manager-company.service';
import { ManagerJobService } from '@app/admin/service/manager-job.service';
import { ManagerEventService } from "@app/admin/service/manager-event.service";
import { ManagerApplyService } from "@app/admin/service/manager-apply.service";
import { ManagerSlideService } from '@app/admin/service/manager-slide.service';
@NgModule({
    imports: [
        adminRouter,
        CoreModule,
        SharedModule,
        ShareAdminModule,
        FormsModule,
        LayoutModule,
    ],
    exports: [],
    declarations: [
        AdminComponent,
        LoginAdminComponent
    ],
    providers: [
        AdminGuard,
        ManagerUserService,
        AdminDialogService,
        ManagerJobGroupService,
        UploadFileService,
        ManagerWorkTypeService,
        ManagerCompanyService,
        ManagerJobService,
        ManagerEventService,
        ManagerApplyService,
        ManagerSlideService
    ],
})
export class AdminModule { }
