import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '@services/backend/profile.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from '@services/frontend/alert.service';
import { AuthService } from '@services/backend/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hure-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter()
  changePwdForm: FormGroup
  constructor(private profileSvc: ProfileService, private fb: FormBuilder,
    private alertSvc: AlertService, private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
    this.createForm()
  }
  changePasswordSubmit() {
    this.profileSvc.updatePassword(this.changePwdForm.controls.oldPwd.value, this.changePwdForm.controls.newPwd.value).subscribe(re => {
      if (re == true) {
        this.alertSvc.show("Thông báo", "Thay đổi mật khẩu thành công");
        this.router.navigate(["/"]);
        this.authSvc.loginRequest$.emit(true);
        this.close();
      } else {
        this.alertSvc.show("Thông báo", "Thay đổi mật khẩu thất bại", "danger");
      }
    })
  }
  close() {
    this.onSubmit.emit(true);
  }
  createForm() {
    this.changePwdForm = this.fb.group({
      oldPwd: new FormControl('',[ Validators.required]),
      newPwd: new FormControl('', [Validators.required,Validators.minLength(10)]),
      newPwd2: new FormControl('', Validators.required)
    })
  }
}
