import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountComponent } from './manage-account.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { ManageAccountRoutes } from '@app/end-user/manage-account/manage-account.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountSettingsComponent } from '@app/end-user/manage-account/pages/account-settings/account-settings.component';
import { JobSettingsComponent } from '@app/end-user/manage-account/pages/job-settings/job-settings.component';
import { ChangePasswordComponent } from '@app/end-user/manage-account/components/change-password/change-password.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { UploadFileService } from '@app/admin/service/front-end/upload-file.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ManageAccountRoutes,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    FormsModule,
    //add module dung chung
    ShareAdminModule
  ],
  declarations: 
  [ManageAccountComponent, ChangePasswordComponent,
    AccountSettingsComponent,
    JobSettingsComponent,
  ],
  providers : [
    UploadFileService
  ] 
})
export class ManageAccountModule { }