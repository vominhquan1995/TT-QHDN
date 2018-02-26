import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { ProgressService } from '@services/frontend/progress.service';
@Component({
    selector: 'app-progress',
    templateUrl: './progressBar.component.html',
    styles: [`
        .progress{
            position: fixed;
            top:0;
            right: 0;
            left:0;
        }
    `], animations: [
        trigger('progressing', [
            transition('void => *', [
                style({ width: 0 }),
                animate(250, style({ width: '*' }))
            ])
        ]),
        trigger('progressBarChanged', [
            transition('* => void', [
                style({ opacity: '*' }),
                animate(250, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class ProgressComponent implements OnInit, OnDestroy {
    percent: number = 0;
    subcription: Subscription;
    isActivated = false;
    constructor(private progressSvc: ProgressService) { }
    ngOnDestroy(): void {
        this.subcription.unsubscribe();
    }
    ngOnInit() {
        this.subcription = this.progressSvc.progressChanged.subscribe((body: number) => {
            if (body >= 100) {
                this.percent = 100;
                setTimeout(() => this.isActivated = false, 1000);
            } else {
                this.isActivated = true;
                this.percent = body;
            }
        });
    }
}