import { Component, OnInit } from '@angular/core';
import { SlideService } from '@services/backend/slide.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
    slides$: Observable<Slide[]>
    ngOnInit(): void {
        this.slides$ = this.service.gets().pipe().share();
    }
    constructor(private service: SlideService) { }

}
