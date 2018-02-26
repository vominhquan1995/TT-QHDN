import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'checkbox.component.html'
})

export class CheckboxComponent implements OnInit {
    private _isCheck: boolean = false;
    @Input('isCheck')
    get isCheck() {
        return this._isCheck;
    }
    set isCheck(value: any) {
        if (typeof (value) == "string") {
            this._isCheck = value.toString() === "true";
        } else {
            this._isCheck = value;
        }
    }
    @Input() text: string = ""
    constructor() { }

    ngOnInit() { }
}