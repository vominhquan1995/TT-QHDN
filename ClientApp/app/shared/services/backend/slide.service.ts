import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/backend/common-http.service';
import { Observable } from 'rxjs/Observable';
import { URL } from '@services/service.variables';
@Injectable()
export class SlideService {
    private URL = URL.SLIDE_URL
    constructor(private http: CommonHttpService<Role>) { }
    private getSlides$: Observable<Slide[]>
    gets(): Observable<Slide[]> {
        if (!this.getSlides$) {
            this.getSlides$ = this.http.gets<Slide>(this.URL, this.http.createHeader()).share();
        }
        return this.getSlides$;
    }
}