import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { homeRouter } from './home.router';
import { CoreModule } from "@core/core.module";
import { JobsContainerComponent } from '@app/end-user/home/components/jobs-container/jobs-container.component';
import { SharedModule } from '@shared/shared.module';
import { IndexPageComponent } from '@app/end-user/home/pages/index/index-page.component';
import { CommonModule } from '@angular/common';
import { BrandContainerComponent } from '@app/end-user/home/components/brand-container/brand-container.component';
import { JobGroupComponent } from '@app/end-user/home/components/job-group-container/job-group-container.component';
import { ActionBarComponent } from '@app/end-user/home/components/action-bar/action-bar.component';
import { SearchBarComponent } from '@app/end-user/home/components/search-bar/search-bar.component';
import { EventModule } from "@app/end-user/event/event.module";
import { EventCardComponent } from '@app/end-user/event/components/event-card/event-card.component';
import { EventsBarComponent } from '@app/end-user/home/components/events-bar/events-bar.component';

@NgModule({
    imports: [
        CommonModule,
        homeRouter,
        CoreModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        IndexPageComponent,
        BrandContainerComponent,
        ActionBarComponent,
        JobGroupComponent,
     EventsBarComponent],
    providers: [],
})
export class HomeModule { }
