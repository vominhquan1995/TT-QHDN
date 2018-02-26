import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ConfirmService } from '@services/frontend/confirm.service';
import { CommonHttpService } from '@services/backend/common-http.service';
@Component({
    selector: 'hure-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    contactForm: FormGroup;
    constructor(private fb: FormBuilder, private confirmSvc: ConfirmService) {
        this.createForm();
    }
    createForm() {
        this.contactForm = this.fb.group({
            fullname: new FormControl('', Validators.required),
            phone: new FormControl('', [Validators.required, Validators.minLength(8),
            Validators.pattern('[0-9]+')]),
            email: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            content: new FormControl('', [Validators.required, Validators.minLength(100)])
        })
    }
    get contentLength() {
        return (this.contactForm.controls.content.value as string).length;
    }
    submitContact() {
        this.confirmSvc.showConfirm("Bạn có chắc?", "Nếu những thông tin bạn gửi cho chúng tôi hoàn toàn là sự thật, vui lòng xác nhận.",
            [{
                text: "Xác nhận",
                func: () => this.sendContact()
            }])
    }
    private sendContact() {
        
    }
}