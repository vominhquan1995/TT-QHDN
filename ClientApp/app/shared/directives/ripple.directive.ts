import { Directive, HostListener, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { style, animate, group, AnimationBuilder } from '@angular/animations';
@Directive({ selector: '[rippleEffect]' })
export class RippleDirective {
    constructor(private el: ElementRef, private renderer: Renderer, private renderer2: Renderer2) {
        this.renderer.setElementStyle(this.el.nativeElement, 'overflow', 'hidden');
        this.renderer.setElementStyle(this.el.nativeElement, 'position', 'relative');
    }
    @HostListener('mousedown', ['$event']) onmousedown(event: any) {
        this.createShapeRipple(event.offsetX, event.offsetY)
    }
    createShapeRipple(x: number, y: number) {
        var ripple = this.renderer.createElement(this.el.nativeElement, 'div');
        this.renderer.setElementStyle(ripple, 'border-radius', '20px');
        this.renderer.setElementStyle(ripple, 'position', 'absolute');
        this.renderer.setElementStyle(ripple, 'height', '40px');
        this.renderer.setElementStyle(ripple, 'width', '40px');
        this.renderer.setElementStyle(ripple, 'pointer-events', 'none');
        let colorBackground = window.getComputedStyle(this.el.nativeElement).backgroundColor || "rgba(0,0,0,0)";
        let colorArr = colorBackground.replace('rgba', '').replace('rgb', '').replace(')', '').replace('(', '').split(',');
        if (colorArr.filter(t => t.trim() === "0").length >= 3 || colorBackground == "transparent") {
            this.renderer.setElementStyle(ripple, 'background', 'black');
        } else {
            this.renderer.setElementStyle(ripple, 'background', 'white');
        }

        this.renderer.setElementStyle(ripple, 'left', (x - 10).toString() + 'px');
        this.renderer.setElementStyle(ripple, 'top', (y - 10).toString() + 'px');
        this.renderer.setElementStyle(ripple, 'opacity', '0.5');
        let scaleNumber = this.el.nativeElement.offsetWidth / 40;
        this.renderer.setElementStyle(ripple, 'transition', 'all .8s ease-out');
        this.renderer.setElementStyle(ripple, 'opacity', '0');
        this.renderer.setElementStyle(ripple, 'transform', 'scale(' + scaleNumber * 2 + ')');
        setTimeout(() => this.renderer2.removeChild(this.el.nativeElement, ripple), 800);
    }
}