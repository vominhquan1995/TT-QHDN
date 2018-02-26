import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AlertService {
    alertChanged: EventEmitter<any> = new EventEmitter();
    private showAlert = (title: string, message: string, type: string, action: () => void = () => { }) =>
        this.alertChanged.emit({ action: action, message: message, title: title, type: type });
    public show(title: string, message: string, type: string = 'success',action: () => void = () => { }) {
        this.showAlert(title, message, type, action);
    }
}