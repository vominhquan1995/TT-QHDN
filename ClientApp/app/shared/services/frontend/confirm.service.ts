import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ConfirmService {
    confirmChanged: EventEmitter<any> = new EventEmitter();
    public showConfirm = (title: string, message: string, actions:any[]=[]) =>
        this.confirmChanged.emit({ message: message, title: title, actions:actions });

}
