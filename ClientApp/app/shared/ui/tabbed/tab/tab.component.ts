import { Component, OnInit, Input } from '@angular/core';
import { TabbedComponent } from '../tabbed.component';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
@Component({
    selector: 'hure-tab',
    templateUrl: './tab.component.html',
    animations: [
        trigger('tabChanged', [
            transition('void => *', [
                style({ opacity:1, transform: 'translateX(-100%)' }),
                animate(250)
            ]),
            transition('* => void', [
                animate(250, style({ opacity:0, transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class TabComponent implements OnInit {
    @Input() title: string;
    @Input() isActivated: boolean;
    constructor(private tabbed: TabbedComponent) {
        this.tabbed.addTab(this);
    }

    ngOnInit() { 
        if(this.isActivated){
            this.tabbed.selectTab(this);
        }
    }
}