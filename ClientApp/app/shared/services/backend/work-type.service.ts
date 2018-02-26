import { Injectable } from '@angular/core';
import { URL } from '@services/service.variables';
import { CommonHttpService } from '@services/backend/common-http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkTypeService {
    private URL = URL.WORKTYPE_URL
    constructor(private http:CommonHttpService<WorkType>){}
    private workTypes$:Observable<WorkType[]>
    getWorkTypes(){
        if(!this.workTypes$){
            this.workTypes$ = this.http.gets<WorkType>(this.URL, this.http.createHeader()).share()
        }
        return this.workTypes$;
    }
}