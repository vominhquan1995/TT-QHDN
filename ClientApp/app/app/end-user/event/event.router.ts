import { Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { RouterModule } from '@angular/router';
import { EventPageComponent } from '@app/end-user/event/pages/events/event-page.component';
import { EventDetailComponent } from '@app/end-user/event/pages/event-detail/event-detail.component';


const router: Routes = [
    {
        path: '',
        component: EventComponent, children:[
            {
                path:'', component: EventPageComponent
            },
            {
                path:'detail/:id', component: EventDetailComponent
            },
        ]
    }
];

export const eventRouter = RouterModule.forChild(router);