import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'admin-switch-button',
    templateUrl: './switch-button.component.html',
    styleUrls: ['./switch-button.component.scss']
})
export class AdminSwitchButtonComponent implements OnInit {
    @Input() Title: string;
    @Input() value: boolean = false;
    @Output() valueChanged: EventEmitter<any> = new EventEmitter();
    constructor() { }
    ngOnInit() {
        this.change();
    }
    change() {
        this.valueChanged.emit(this.value)
    }
}
