import { NgModule } from '@angular/core';

import { ContactComponent } from './contact.component';
import { contactRouter } from './contact.router';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, SharedModule,contactRouter, ReactiveFormsModule],
    exports: [],
    declarations: [ContactComponent],
    providers: [],
})
export class ContactModule { }
