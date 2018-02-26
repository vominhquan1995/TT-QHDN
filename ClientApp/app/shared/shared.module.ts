import { NgModule } from '@angular/core';
import { UIModule } from '@ui/ui.module';
import { DirectiveModule } from '@directives/directive.module';
import { GuardModule } from '@guards/guard.module';
import { PipeModule } from '@shared/pipes/pipe.module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [CommonModule,UIModule, DirectiveModule, GuardModule, PipeModule],
    exports: [DirectiveModule, UIModule, GuardModule, PipeModule],
    declarations: [],
    providers: [],
})
export class SharedModule { }
