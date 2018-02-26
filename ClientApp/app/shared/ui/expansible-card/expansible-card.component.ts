import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
@Component({
    selector: 'hure-expansible-card',
    templateUrl: 'expansible-card.component.html',
    styleUrls: ['./expansible-card.component.scss'],
    animations: [
        trigger('expandChanged', [
            state('0', style({
                height: '200px'
            })),
            state('1', style({
                height: 'auto', 
            })),
            transition('1 => 0', [
                style({ height: '*' }),
                animate(100, style({ height: 200 }))
            ]), transition('0 => 1', [
                style({ height: 200 }),
                animate(100, style({ height: '*' }))
            ]),
        ])
    ]
})

export class ExpansibleCardComponent implements OnInit {
    isExpanded = false;
    constructor() { }
    ngOnInit() { }
}