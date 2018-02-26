import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverEffect } from './hoverEffect.directive';
import { RippleDirective } from '@directives/ripple.directive';
import { ClickOutsideDirective } from '@directives/clickOutside.directive';

@NgModule({
    declarations: [HoverEffect, ClickOutsideDirective, RippleDirective],
    imports: [ CommonModule ],
    exports: [HoverEffect, ClickOutsideDirective, RippleDirective],
    providers: [],
})
export class DirectiveModule {}