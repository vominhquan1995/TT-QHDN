import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '@ui/action-menu/action-menu.component';

@Component({
    selector: 'hure-action-item',
    templateUrl: 'action-item.component.html',
    styleUrls:['./action-item.component.scss']
})

export class ActionItemComponent implements OnInit {
    @Input() item: MenuItem;
    constructor() { }

    ngOnInit() { }
}