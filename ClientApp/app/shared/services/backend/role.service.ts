import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/backend/common-http.service';
import { Observable } from 'rxjs/Observable';
import { URL } from '@services/service.variables';

@Injectable()
export class RoleService {
    private URL = URL.ROLE_URL
    constructor(private http: CommonHttpService<Role>) { }
    private getRoles$: Observable<Role[]>
    gets(): Observable<Role[]> {
        if (!this.getRoles$) {
            this.getRoles$ = this.http.gets<Role>(this.URL, this.http.createHeader()).share();
        }
        return this.getRoles$;
    }
}