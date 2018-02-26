import { Component, AfterViewChecked, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'admin-ckeditor',
    template: `
  <ckeditor
    [(ngModel)]="ckeditorContent"
    [config]="{uiColor: '#FFFFFF'}"
    [readonly]="false"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    debounce="500">
    <ckbutton [name]="'saveButton'"
        [command]="'saveCmd'"
        (click)="save($event)"
        [icon]="'save.png'"
        [label]="'Save Document'"
        [toolbar]="'clipboard,1'">
  </ckbutton>
  </ckeditor>
  `
})
export class AdminCkeditor {
    @Input() ckeditorContent: string;
    @Output() valueChanged: EventEmitter<any> = new EventEmitter();
    constructor() {
        this.ckeditorContent = `<p></p>`;
    }
    onChange($event: any) {
        this.valueChanged.emit($event)
    }
    onReady($event: any) {

    }
    onFocus($event: any) {

    }
    onBlur($event: any) {

    }
    save($event: any) {

    }
    public getContent() {
        return this.ckeditorContent;
    }
}