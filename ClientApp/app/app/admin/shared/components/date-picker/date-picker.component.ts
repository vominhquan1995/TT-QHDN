import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
const now = new Date();
@Component({
    selector: 'admin-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    public model: any;
    @Output() timeChange: EventEmitter<any> = new EventEmitter();
    @Input() currentValue: Date;
    private readonly minDate={ year: 1950, month: 1 , day: 1 }
    constructor() { }

    ngOnInit() {
        //can buoc nay k se loi
        if (this.currentValue) {
            this.currentValue = new Date(this.currentValue)
            this.model = { year: this.currentValue.getFullYear(), month: this.currentValue.getMonth() + 1, day: this.currentValue.getDate() };
        } else {
            this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        }
        this.timeChange.emit(this.submitTime())
    }
    getTime() {
        return this.model;
    }
    change() {
        this.timeChange.emit(this.submitTime())
    }
    submitTime() {
        let array = []
        array.push(this.model.year)
        if (this.model.month < 9) {
            array.push('0' + this.model.month);
        } else {
            array.push(this.model.month);
        }
        if (this.model.day < 9) {
            array.push('0' + this.model.day);
        } else {
            array.push(this.model.day);
        }
        return array.join('/')
    }
}
