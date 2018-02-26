import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {
    loadingChanged: EventEmitter<boolean> = new EventEmitter();
    public showLoading = (isLoading:boolean) =>
        this.loadingChanged.emit(isLoading);
}