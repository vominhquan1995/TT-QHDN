import { Component, OnInit, Input } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
    selector: 'hure-tabbed',
    templateUrl: './tabbed.component.html'
})
export class TabbedComponent implements OnInit {
    @Input() height: number = 300;
    tabs: TabComponent[] = []
    constructor() { }
    addTab(tab: TabComponent) {
        this.tabs.push(tab);
    }
    selectTab(tab: TabComponent) {
        this.tabs.forEach(t => t.isActivated = false);
        setTimeout(() => tab.isActivated = true, 250)
    }
    ngOnInit() {
    }
}