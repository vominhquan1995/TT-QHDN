import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { TabbedComponent } from './tabbed/tabbed.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownItemComponent } from './dropdown/dropdownItem/dropdownItem.component';
import { TabComponent } from './tabbed/tab/tab.component';
import { JobComponent } from './job/job.component';
import { BlogComponent } from './blog/blog.component';
import { RatingBarComponent } from './rating/rating.component';
import { ExpansibleCardComponent } from './expansible-card/expansible-card.component';
import { PopoverComponent } from './popover/popover.component';
import { DirectiveModule } from '@directives/directive.module';
import { WaiterComponent } from '@ui/waiter/waiter.component';
import { CarouselListComponent } from '@ui/carousel-list/carousel-list.component';
import { ActionMenuComponent } from '@ui/action-menu/action-menu.component';
import { ActionItemComponent } from '@ui/action-menu/action-item/action-item.component';
import { PipeModule } from '@shared/pipes/pipe.module';
import { OverlayComponent } from './overlay/overlay.component';
import { JobsContainerComponent } from '@app/end-user/home/components/jobs-container/jobs-container.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [GroupComponent, TabbedComponent, DropdownComponent,
        DropdownItemComponent, TabComponent, JobComponent, BlogComponent, WaiterComponent,
        RatingBarComponent, ExpansibleCardComponent, PopoverComponent, CarouselListComponent,
        ActionMenuComponent, ActionItemComponent,
        OverlayComponent, JobsContainerComponent
    ],
    imports: [CommonModule, DirectiveModule, PipeModule, NgxPaginationModule],
    exports: [GroupComponent, TabbedComponent, DropdownComponent,
        DropdownItemComponent, TabComponent, JobComponent, WaiterComponent,
        OverlayComponent,JobsContainerComponent,
        BlogComponent, RatingBarComponent, ExpansibleCardComponent, PopoverComponent, CarouselListComponent,
        ActionMenuComponent, ActionItemComponent],
    providers: [],
})
export class UIModule { }