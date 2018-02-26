import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { IndexPageComponent } from '@app/end-user/home/pages/index/index-page.component';

const router: Routes = [
    {
        path: '',
        component: HomeComponent, children:[
            {
                path:'', component: IndexPageComponent
            },
        ]
    }
];

export const homeRouter = RouterModule.forChild(router);
