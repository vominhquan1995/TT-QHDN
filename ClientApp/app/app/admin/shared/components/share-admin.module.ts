import { NgModule } from "@angular/core";
import { DatePickerComponent } from "@app/admin/shared/components/date-picker/date-picker.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { SexSeletComponent } from "@app/admin/shared/components/sex-select/sex-select.component";
import { AdminDropdownComponent } from "@app/admin/shared/components/dropdown/dropdown.component";
import { AdminAlertComponent } from "@app/admin/shared/components/alert/alert.component";
import { AdminSwitchButtonComponent } from "@app/admin/shared/components/switch-button/switch-button.component";
import { AdminDialogComponent } from "@app/admin/shared/components/dialog/dialog.component";
import { AdminUploadFileComponent } from "@app/admin/shared/components/upload-file/upload-file.component";
import { AdminCkeditor } from "@app/admin/shared/components/ckeditor/ckeditor.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { ProgressBarApplyComponent } from "@app/admin/shared/components/progress-bar-apply/progress-bar-apply.component";
import { AdminLoadingComponent } from "@app/admin/shared/components/loading/loading.component";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        CKEditorModule
    ],
    exports: [
        DatePickerComponent,
        SexSeletComponent,
        AdminDropdownComponent,
        AdminAlertComponent,
        AdminSwitchButtonComponent,
        AdminDialogComponent,
        AdminUploadFileComponent,
        AdminCkeditor,
        ProgressBarApplyComponent,
        AdminLoadingComponent
    ],
    declarations: [
        DatePickerComponent,
        SexSeletComponent,
        AdminDropdownComponent,
        AdminAlertComponent,
        AdminSwitchButtonComponent,
        AdminDialogComponent,
        AdminUploadFileComponent,
        AdminCkeditor,
        ProgressBarApplyComponent,
        AdminLoadingComponent
    ],
})
export class ShareAdminModule { }
