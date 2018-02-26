import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { DropdownItemComponent } from './dropdownItem/dropdownItem.component';

@Component({
    selector: 'hure-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {
    ngOnChanges(changes: any): void {
        if(changes.selectedItem && changes!.selectedItem!.currentValue==null){
            this.selectedItem = null;
        }
    }
    // change return DropdownItemComponent => this.value to get value
    @Output() change = new EventEmitter<any>();
    @Input() placeholder = "Hello"
    // isActivated = true => dropdown show items
    isActivated = false;
    items: DropdownItemComponent[] = [];
    @Input() @Output() selectedItem: any;
    constructor() { }
    addItem(item: DropdownItemComponent) {
        this.items.push(item);
    }
    selectItemEmit(item: DropdownItemComponent | null) {
        this.selectItem(item!);
        if (item) {
            this.change.emit(item!);
            this.isActivated = false;
        }
    }
    selectItem(item: DropdownItemComponent) {
        this.items.forEach(i => i.isSelected = false);
        if (item) {
            item.isSelected = true;
        }
        this.selectedItem = item;
    }
    ngOnInit() {
    }
}