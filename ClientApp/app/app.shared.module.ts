import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing } from "./app.router";
import { AppComponent } from './app/app.component';
import { ServiceModule } from '@services/service.module';
import { UIModule } from '@ui/ui.module';
import { DirectiveModule} from '@directives/directive.module';
import { SharedModule } from '@shared/shared.module';
import { ErrorComponent } from '@app/end-user/error/error.component';
import { CoreModule } from '@core/core.module';
@NgModule({
    declarations: [AppComponent, ErrorComponent
    ],
    imports: [
        CommonModule,
        ServiceModule,
        routing,
    ]
})
export class AppModuleShared {
}
