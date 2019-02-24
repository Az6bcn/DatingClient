import { AppError } from './../Errors/AppError';
import { AuthService } from './../Services/auth.service';
import { Login } from './../Model/Login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UnAuthorizedError } from '../Errors/UnAuthorizedError';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginForm: FormGroup;
  isLoggedIn: boolean;
  welcomeUser: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.loadForm(this.fb);
  }

  signIn(userLoginFormValue: Login) {
    console.log(userLoginFormValue);
    this.authService
      .login(userLoginFormValue)
      .subscribe((response: boolean) => {
        if (response) {
          this.isLoggedIn = response;
          this.welcomeUser = `Welcome ${userLoginFormValue.username}`;
          this.notifierService.notify('success', 'log in succesfully');
        }
      },
      (error: AppError) => {
        if (error instanceof UnAuthorizedError) {
          this.notifierService.notify('error', 'lease Register to login');
        } else {
          this.notifierService.notify('error', 'Something went worng... Please try again in few minutes');

        }
      });
  }

  logOut() {
    localStorage.removeItem('Token');
    this.isLoggedIn = false;
    this.notifierService.notify('success', 'log out succesfully');
  }
  private loadForm(builder: FormBuilder) {
    this.userLoginForm = NavComponent.buildFormGroup(builder);
  }

  /**
   * Check if there's any user logged-in
   */
  checkIfUserLoggedIn(): boolean {
    const token = localStorage.getItem('Token');
    return !!token;
  }

  // tslint:disable-next-line:member-ordering
  private static buildFormGroup(builder: FormBuilder) {
    return builder.group({
      userLogin: builder.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      })
    });
  }
}
