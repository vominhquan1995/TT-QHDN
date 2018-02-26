import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareAdminModule } from "@app/admin/shared/components/share-admin.module";
import { ManagerEventRoutingModule } from "@app/admin/pages/manager-event/manager-event-routing.module";
import { ManagerEventComponent } from "@app/admin/pages/manager-event/manager-event.component";
import { CreateEventComponent } from "@app/admin/pages/manager-event/create-event/create-event.component";
import { EditEventComponent } from "@app/admin/pages/manager-event/edit-event/edit-event.component";
@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        ManagerEventRoutingModule,
        FormsModule,
        ShareAdminModule
    ],
    declarations: [
        ManagerEventComponent,
        CreateEventComponent,
        EditEventComponent
    ]
})
export class ManagerEventModule { }