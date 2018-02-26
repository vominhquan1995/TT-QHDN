import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class AdminDialogService {
    //đăng kí sự kiện cho admin dialog
    dialogEvent: EventEmitter<any> = new EventEmitter();
    public show = (title: string, message: string, action: () => void = () => { }) =>
        this.dialogEvent.emit({ action: action, message: message, title: title });
}