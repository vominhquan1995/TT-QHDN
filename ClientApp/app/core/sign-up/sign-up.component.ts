import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { RoleService } from '@services/backend/role.service';
import { share } from 'rxjs/operators';
import { AuthService } from '@services/backend/auth.service';

@Component({
  selector: 'hure-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter()
  states: string[] = ["PICK_TYPE",
    "COMPANY_INFO", "USER_INFO", "FINISH"
  ]
  state: string = this.states[0];
  step: number[] = []
  roles$: Observable<Role[]>
  private roles: Role[]
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder,
    private roleSvc: RoleService, private authSvc: AuthService) {
    this.createForm()
    this.getRoles()
  }
  nextStep() {
    this.step.push(this.states.indexOf(this.state))
    let index = this.states.indexOf(this.state);
    if (index == 0) {
      let role = this.signUpForm.controls.roleId.value || 0
      this.roles$.subscribe(r => {
        this.roles = r
        let indexOfRole = this.roles.indexOf(this.roles.find(o => o!.id == role)!)
        if (this.roles[indexOfRole].name == "Student") {
          this.state = this.states[2]
        } else {
          this.state = this.states[1]
        }
      });
    } else {
      this.state = this.states[index + 1]
    }
  }
  async finish() {
    var result: boolean;
    if (this.step[1] == 1) {
      // Do company stuff
      result = await this.authSvc.signUp(this.signUpForm.value, true)
    } else {
      //Do student stuff
      result = await this.authSvc.signUp(this.signUpForm.value)
    }
    if (result == true) {
      this.close.emit()
    }
  }
  roleChange(item: any) {
    this.signUpForm.controls.roleId.setValue(item.value)
  }
  private getRoles() {
    this.roles$ = this.roleSvc.gets().pipe(share())
  }
  createForm() {
    this.signUpForm = this.fb.group({
      roleId: new FormControl(0, Validators.required),
      email: new FormControl('', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mssv: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("[0-9]+")]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(10)]),
      companyName: new FormControl('', Validators.required),
      companyDescription: new FormControl('', [Validators.required, Validators.minLength(20)]),
      companyAddress:new FormControl('', [Validators.required, Validators.minLength(20)]),
      companyPhone:new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      companyEmail: new FormControl('', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      taxCode: new FormControl('', Validators.required),
      companyWebsite: new FormControl('', [Validators.required,
      Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')])
    })
  }

  ngOnInit() {
  }

}
