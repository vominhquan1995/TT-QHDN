import { Router, Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { ErrorComponent } from "@app/end-user/error/error.component";
export const routes: Routes = [
    {
        path: '', loadChildren: './app/end-user/end-user.module#EndUserModule'
    },
    {
        path: 'admin', loadChildren: './app/admin/admin.module#AdminModule'
    },
    { path: '**', component: ErrorComponent }
]
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);