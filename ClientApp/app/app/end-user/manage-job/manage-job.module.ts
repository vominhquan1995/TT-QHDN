import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageJobComponent } from './manage-job.component';
import { ManageJobRoutes } from '@app/end-user/manage-job/manage-job.routing';
import { JobCompanyManagerComponent } from '@app/end-user/manage-job/pages/jobs-company-manager/jobs-company-manager.component';
import { ModalCreateJobComponent } from '@app/end-user/manage-job/components/create-job/create-job.component';
import { ModalEditJobComponent } from '@app/end-user/manage-job/components/edit-job/edit-job.component';
import { CvOfJobComponent } from '@app/end-user/manage-job/pages/cvs-job/cvs-job.component';
import { DetailCvComponent } from '@app/end-user/manage-job/components/detail-cv/detail-cv.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareAdminModule } from '@app/admin/shared/components/share-admin.module';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { UpdateProgressComponent } from '@app/end-user/manage-job/components/update-progress/update-progress.component';

@NgModule({
  imports: [
    CommonModule, ManageJobRoutes, ReactiveFormsModule,
    NgbModule.forRoot(),
    FormsModule, SharedModule,
    CoreModule,
    //add module dung chung
    ShareAdminModule
  ],
  declarations: [ManageJobComponent,
    JobCompanyManagerComponent,
    ModalCreateJobComponent,
    ModalEditJobComponent,
    CvOfJobComponent,
    DetailCvComponent,
    UpdateProgressComponent
  ]
})
export class ManageJobModule { }