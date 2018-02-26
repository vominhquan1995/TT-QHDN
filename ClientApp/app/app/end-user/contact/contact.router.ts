import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const router: Routes = [
    {
        path: '',
        component: ContactComponent
    }
];

export const contactRouter = RouterModule.forChild(router);
