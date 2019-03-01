import { AuthService } from './../Services/auth.service';
import { RegisterModel } from './../Model/RegisterModel';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
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
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    });
  }
}
