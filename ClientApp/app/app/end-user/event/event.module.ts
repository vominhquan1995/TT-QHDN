
import { NgModule } from "@angular/core"
import { EventComponent } from "./event.component"
import { CommonModule } from "@angular/common";
import { CoreModule } from "@core/core.module";
import { SharedModule } from "@shared/shared.module";


import { eventRouter } from "@app/end-user/event/event.router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EventDetailComponent } from "@app/end-user/event/pages/event-detail/event-detail.component";
import { EventPageComponent } from "@app/end-user/event/pages/events/event-page.component";
import { EventBannerComponent } from "@app/end-user/event/components/eventbanner/eventbanner.component";
import { EventCardComponent } from "@app/end-user/event/components/event-card/event-card.component";
import { EventListComponent } from "@app/end-user/event/components/eventlist/eventlist.component";


@NgModule({
    imports: [CommonModule, eventRouter, CoreModule, SharedModule,NgbModule.forRoot()],
    exports: [],
    declarations: [EventPageComponent, EventBannerComponent,EventComponent,EventListComponent, EventDetailComponent],
    providers: [],
})
export class EventModule {

}
