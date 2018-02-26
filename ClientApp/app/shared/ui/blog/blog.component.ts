import{Component,Input} from '@angular/core';
@Component({
    selector:'hure-blog',
    templateUrl:'./blog.component.html',
    styleUrls:['./blog.component.scss']
})
export class BlogComponent{
    @Input() image: string;
    @Input() link: string;
    @Input() linktotime: string;
    @Input() linkcomment: string;
    @Input() title: string;
    @Input() content: string;
    @Input() time: string;
    @Input() comment: string;
}