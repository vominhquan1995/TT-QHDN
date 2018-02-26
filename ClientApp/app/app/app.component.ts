import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmService } from '@services/frontend/confirm.service';
import { AlertService } from '@services/frontend/alert.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    route$: Subscription
    ngOnDestroy(): void {
        this.route$.unsubscribe();
    }
    ngOnInit(): void {
        this.route$ = this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            if (typeof window != 'undefined') {
                window.scrollTo(0, 0)
            }
        });
    }
    constructor(private router: Router) {

    }

}
