import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from "@app/admin/pages/home/home.component";
import { HomeRoutingModule } from "@app/admin/pages/home/home-routing.module";
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        StatModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
