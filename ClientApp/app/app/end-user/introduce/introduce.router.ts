import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IntroduceComponent } from './introduce.component';

const router: Routes = [
    {
        path: '',
        component: IntroduceComponent
    }
];

export const introRouter = RouterModule.forChild(router);
