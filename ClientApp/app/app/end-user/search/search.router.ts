import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '@app/end-user/search/search.component';

const router: Routes = [
    {
        path: '',
        component: SearchComponent
    }
];

export const searchRouter = RouterModule.forChild(router);
