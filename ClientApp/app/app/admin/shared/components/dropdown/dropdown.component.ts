import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
const now = new Date();
@Component({
    selector: 'admin-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class AdminDropdownComponent implements OnInit {
    @Input() Title: string;
    @Input() Models: string;
    @Input() ValueShow: string;
    @Input() ValueSelect: string;
    @Input() currentValue: string;
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    constructor() { }
    ngOnInit() {
        if (this.currentValue == undefined) {
            this.currentValue = '';
        }
    }
    change() {
        this.valueChange.emit(this.currentValue);
    }
}
