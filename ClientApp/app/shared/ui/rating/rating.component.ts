import { Component, Output, Input } from "@angular/core";

@Component({
    selector: 'hure-rating-bar',
    templateUrl: './rating.component.html',
    styles: [`
        .fill{
            background: black;
        }
    `]
})
export class RatingBarComponent {
    textRating = ["Very Bad", "Bad", "So so", "Good", "Perfect"]
    @Input() rating: number = 0;
    @Input() max: number = 5;
    range(star: number) {
        var arr = [];
        for (let index = 1; index <= this.max; index++) {
            arr.push(index);
        }
        return arr;
    }
    selectStar(i: number) {
        this.rating = i;
    }
}