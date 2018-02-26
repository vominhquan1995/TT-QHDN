import { NgModule } from '@angular/core';

import { IntroduceComponent } from './introduce.component';
import { introRouter } from './introduce.router';
import { UIModule } from '@ui/ui.module';

@NgModule({
    imports: [introRouter, UIModule],
    exports: [],
    declarations: [IntroduceComponent],
    providers: [],
})
export class IntroduceModule { }
