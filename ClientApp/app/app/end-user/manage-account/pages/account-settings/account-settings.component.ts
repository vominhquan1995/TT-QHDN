import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from '@services/backend/profile.service';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '@services/frontend/alert.service';
import { URL_DEFAULT } from '@shared/_variables';

@Component({
  selector: 'hure-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  isChangePwd: boolean;
  isUpdateCV = false;
  isCompanyUpdate = false;
  onChangePwdSubmit(e: boolean) {
    this.isChangePwd = false;
  }
  updateCompnay() {
    this.profileSvc.updateCompany(this.companyForm.value).subscribe(res => {
      if (res.Name != "") {
        this.alertSvc.show("Thông báo", "Đã cập nhật thông tin.")
        this.companyForm = this.fb.group(res);
      } else {
        this.alertSvc.show("Thông báo", "Cập nhật thông tin thất bại", "danger")
      }
      this.isCompanyUpdate = !this.isCompanyUpdate;
    });
  }
  ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }
  sub: Subscription
  accountForm: FormGroup;
  cvForm: FormGroup;
  companyForm: FormGroup;
  constructor(private profileSvc: ProfileService, private fb: FormBuilder, private alertSvc: AlertService) { }
  isEdit = false;
  ngOnInit() {
    this.createForm()
  }
  createForm() {
    this.sub = this.profileSvc.getAccount().subscribe(ac => {
      ac.avatar = (ac.avatar == null) ? URL_DEFAULT.IMAGE_DEFAULT : ac.avatar;
      this.accountForm = this.fb.group(ac)
      if (ac.cv) {
        this.cvForm = this.fb.group(ac.cv);
      } else if (!ac.companyId) {
        this.cvForm = this.fb.group({
          position: new FormControl('', Validators.required),
          place: new FormControl('', Validators.required),
          level: new FormControl('', Validators.required),
          experience: new FormControl('', Validators.required),
          accountId: new FormControl(ac.id)
        })
      } else {
        this.companyForm = this.fb.group(ac.company)
      }
    })
  }
  updateCV() {
    this.profileSvc.updateCV(this.cvForm.value).subscribe(res => {
      if (res.accountId != 0) {
        this.alertSvc.show("Thông báo", "Đã cập nhật thông tin.")
        this.cvForm = this.fb.group(res);
      } else {
        this.alertSvc.show("Thông báo", "Cập nhật thông tin thất bại", "danger")
      }
      this.isUpdateCV = !this.isUpdateCV;
    });
  }
  update() {
    this.profileSvc.updateAccount(this.accountForm.value).subscribe(res => {
      if (res.username.length > 0) {
        this.alertSvc.show("Thông báo", "Đã cập nhật thông tin.")
        this.accountForm = this.fb.group(res);
      } else {
        this.alertSvc.show("Thông báo", "Cập nhật thông tin thất bại", "danger")
      }
      this.isEdit = !this.isEdit;
    });
  }
  changePassword() {
    this.isChangePwd = true;
  }
  sexChanged(sex: boolean) {
    this.accountForm.value.sex = sex;
  }
  timeChange(time: any) {
    this.accountForm.value.dateOfBirth = time;
  }
  avatarChanged(urlAvatar: string) {
    this.accountForm.value.avatar = urlAvatar;
  }
}
