import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
    selector: 'hure-carousel-list',
    templateUrl: 'carousel-list.component.html',
    styleUrls: ['./carousel-list.component.scss'],
    animations: [
        trigger('itemDis', [
            state('void', style({ transform: 'translateX(0)'})),
            transition('void => *', [
                style({ transform: 'translateX(100%)'}),
                animate('500ms ease-out')
            ]),
            transition('* => void', [
                animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
            ])
        ])
    ]
})

export class CarouselListComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        setInterval(()=> this.slide(),3000);
    }

    @Input() listItem: CarouselItem[]
    @Input() show: number = 6;
    @Input() size: number = 136;
    public static server: string;
    constructor() {

    }
    ngOnInit() {
    }
    slide() {
        let item = this.listItem.shift();
        this.listItem.push(item!);
    }
}

interface CarouselItem {
    img: string;
    text: string
    url: string;
}