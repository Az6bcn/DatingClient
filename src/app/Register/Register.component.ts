import { ComparePasswordValidator } from './../Shared/CustomValidation/ComparePasswordValidator';
import { AuthService } from '../Core/Services/auth.service';
import { RegisterModel } from './../Model/RegisterModel';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ɵConsole } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: true
};
  registerForm: FormGroup;
  @Output() canceledEvent = new EventEmitter<boolean>(true);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {

    this.loadRegisterForm(this.fb);
  }

  register(user: RegisterModel) {
    console.log(user);
    user.Dateofbirth = user.Dateofbirth['jsdate'];
    this.authService.register(user).subscribe(response => {
      this.notifierService.notify('success', 'registered successfully');
      this.cancel();
    });
  }

  cancel() {
    const canceledValue = false;
    this.canceledEvent.emit(canceledValue);
  }

  private loadRegisterForm(builder: FormBuilder) {
    this.registerForm = RegisterComponent.builRegisterFormGroup(builder);
  }

  isFormValid(userRegister: FormGroup): boolean {
    return userRegister.valid;
  }

  // tslint:disable-next-line:member-ordering
  private static builRegisterFormGroup(builder: FormBuilder) {
    return builder.group({
      userRegister: builder.group({
        Username: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
        Knownas: ['', Validators.required],
        Dateofbirth: ['', Validators.required],
        City: ['', Validators.required],
        Country: ['', Validators.required],
        Gender: ['', Validators.required]
      }, {validator: ComparePasswordValidator.PasswordMatchValidator})
    });
  }

  get username() {
    return this.registerForm.get('userRegister.Username');
  }

  get password() {
    return this.registerForm.get('userRegister.Password');
  }

  get confirmedPassword() {
    return this.registerForm.get('userRegister.ConfirmPassword');
  }

  get knownas() {
    return this.registerForm.get('userRegister.Knownas');
  }

  get dateofbirth() {
    return this.registerForm.get('userRegister.Dateofbirth');
  }

  get city() {
    return this.registerForm.get('userRegister.City');
  }

  get country() {
    return this.registerForm.get('userRegister.Country');
  }

  get gender() {
    return this.registerForm.get('userRegister.Gender');
  }

  get userregister() {
    console.log(this.registerForm.get('userRegister'));
    return this.registerForm.get('userRegister');
  }
  clearDate(): void {
    // Clear the date using the patchValue function
    this.registerForm.patchValue({myDate: null});
}
}
