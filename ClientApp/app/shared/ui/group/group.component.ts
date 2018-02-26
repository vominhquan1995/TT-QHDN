import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'hure-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent {
    @Input() image: string;
    @Input() link: string;
    @Input() text: string;
    constructor(private router:Router){}
    gotoGroup(){
        this.router.navigate(['/search',{jobGroup:this.link}])
    }
}