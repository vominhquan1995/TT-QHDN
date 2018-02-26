import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { DropdownComponent } from '../dropdown.component';

@Component({
    selector: 'hure-dropdown-item',
    templateUrl: './dropdownItem.component.html'
})
export class DropdownItemComponent implements OnInit {
    

    // value is object;
    @Input() value: any;
    // content is option text in dropdown
    @Input() text: string;
    @Input() isSelected: boolean;
    constructor(private dropdown: DropdownComponent) {
        this.dropdown.addItem(this);
    }
    selectItem() {
        this.dropdown.selectItemEmit(this);
    }
    ngOnInit() {
        if (this.isSelected) {
            this.dropdown.selectItem(this);
        }
    }
}