import { Component, OnInit, Input } from '@angular/core';
import { Status_Apply } from '@app/admin/shared/variables';

@Component({
    selector: 'progress-bar-apply',
    templateUrl: './progress-bar-apply.component.html',
    styleUrls: ['./progress-bar-apply.component.scss']
})
export class ProgressBarApplyComponent implements OnInit {
    @Input() currentValue: string;
    private listValue = [
        {
            title: 'Nộp hồ sơ',
            active: true,
            disabled: false,
            index: 1
        },
        {
            title: 'Đã xem',
            active: false,
            disabled: false,
            index: 2
        },
        {
            title: 'Hẹn phỏng vấn',
            active: false,
            disabled: false,
            index: 3
        },
        {
            title: 'Hoàn thành',
            active: false,
            disabled: false,
            index: 4
        }
    ]
    constructor() {
    }
    ngOnInit() {
        if (this.currentValue) {
            this.isView()
            if (this.currentValue == Status_Apply.Waiting) {
                this.isWaiting();
            } else if (this.currentValue == Status_Apply.Seen) {
                this.isSeen();
            } else if (this.currentValue == Status_Apply.Interview) {
                this.isInterview()
            } else {
                this.isDone();
            }
        }
    }
    isWaiting() {
        this.listValue[0].active = true;
        this.listValue[1].active = false;
        this.listValue[2].active = false;
        this.listValue[3].active = false;
    }
    isSeen() {
        this.listValue[0].active = true;
        this.listValue[1].active = true;
        this.listValue[2].active = false;
        this.listValue[3].active = false;
    }
    isInterview() {
        this.listValue[0].active = true;
        this.listValue[1].active = true;
        this.listValue[2].active = true;
        this.listValue[3].active = false;
    }
    isDone() {
        this.listValue[0].active = true;
        this.listValue[1].active = true;
        this.listValue[2].active = true;
        this.listValue[3].active = true;
    }
    setCurrent(index: number) {
        switch (index) {
            case 2: {
                this.listValue[0].active = true;
                this.listValue[1].active = true;
                this.listValue[2].active = false;
                this.listValue[3].active = false;
                break;
            }
            case 3: {
                this.listValue[0].active = true;
                this.listValue[1].active = true;
                this.listValue[2].active = true;
                this.listValue[3].active = false;
                break;
            }
            case 4: {
                this.listValue[0].active = true;
                this.listValue[1].active = true;
                this.listValue[2].active = true;
                this.listValue[3].active = true;
                break;
            }
            default: {
                this.listValue[0].active = true;
                this.listValue[1].active = false;
                this.listValue[2].active = false;
                this.listValue[3].active = false;
            }
        }
    }
    isView() {
        this.listValue.forEach(x => {
            x.disabled = true;
        })
    }
}
