import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '@services/backend/profile.service';
import { SETTING_MENUS } from '@shared/_variables';
import { LocalService } from "@services/backend/local.service";

@Component({
  selector: 'hure-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  menus: any[] = SETTING_MENUS
  constructor(private localSvc: LocalService) { }
  private role: string;
  ngOnInit() {
    this.role = this.localSvc.getRole();
  }
}
