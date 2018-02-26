import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProgressService {
    progressChanged: EventEmitter<any> = new EventEmitter();
    public setPercent = (percent: number) =>
        this.progressChanged.emit(percent);
}