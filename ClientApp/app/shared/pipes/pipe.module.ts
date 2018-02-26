import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitTextPipe } from '@shared/pipes/limit-text.pipe';

@NgModule({
    declarations: [LimitTextPipe],
    imports: [ CommonModule ],
    exports: [LimitTextPipe],
    providers: [],
})
export class PipeModule {}