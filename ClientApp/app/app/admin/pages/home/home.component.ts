import { Component, OnInit } from '@angular/core';
import { routerTransition } from "@app/admin/router.animations";

@Component({
    selector: 'home-admin',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    public sliders: Array<any> = [];

    constructor() {
        this.sliders.push(
            {
                imagePath: 'img/slider1.jpg',
                label: 'Thông báo 1',
                text:
                'Trung tâm quản lí doanh nghiệp xin chào !'
            },
            {
                imagePath: 'img/slider2.jpg',
                label: 'Thông báo 2',
                text: 'Hội nghị số 1'
            },
            {
                imagePath: 'img/slider3.jpg',
                label: 'Thông báo 3',
                text:
                'Cuộc gặp đối tác vào thứ 3'
            }
        );
    }
    ngOnInit() { }
}
