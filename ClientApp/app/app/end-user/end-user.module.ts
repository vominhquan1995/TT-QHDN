import { NgModule } from '@angular/core';
import { endUserRouter } from '@app/end-user/end-user.router';
import { EndUserComponent } from '@app/end-user/end-user.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        endUserRouter,
        CoreModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        EndUserComponent,
    ]
})
export class EndUserModule { }
