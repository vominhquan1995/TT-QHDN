import { Directive, ElementRef, Input, Renderer2,HostListener } from '@angular/core';

@Directive({
    selector: '[hoverEffect]',
})
export class HoverEffect {
    constructor(private renderer:Renderer2 ,private elementRef: ElementRef) {
    }
    @HostListener('mouseenter') onmouseenter(){
        this.renderer.addClass(this.elementRef.nativeElement, 'active');
    }
    @HostListener('mouseleave') onmouseleave(){
        this.renderer.removeClass(this.elementRef.nativeElement, 'active');
    }
}