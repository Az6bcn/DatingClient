import { DataSharedService } from './../../Shared/Services/DataSharedService';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../..//Model/Login';
import { AppError } from '../../Errors/AppError';
import { UnAuthorizedError } from '../../Errors/UnAuthorizedError';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginForm: FormGroup;
  isLoggedIn: boolean;
  welcomeUser: string;
  userID: string;
  private mainPhotoUrl: string;
  mainPhotoUrl$: Observable<any>;
  mainPhotoLocalStorage;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtHelperService: JwtHelperService,
    private dataService: DataSharedService
  ) {}

  ngOnInit() {
    this.loadForm(this.fb);
    console.log(this.jwtHelperService.tokenGetter());
    this.isLoggedIn = this.jwtHelperService.tokenGetter() != null ? true : false;

    // tslint:disable-next-line:curly
    if (this.isLoggedIn) this.welcomeUser = `Welcome ${this.getUserNameFromToken()}`;


    this.dataService.currentMessage
    .subscribe(resp => {
      this.mainPhotoUrl$ = of(resp);

      if (resp) {
        localStorage.setItem('mainPhotoURL', resp);
      }

    });

    this.mainPhotoLocalStorage = localStorage.getItem('mainPhotoURL');
    if (this.mainPhotoLocalStorage) {
      this.mainPhotoUrl$ = of(this.mainPhotoLocalStorage);
    }
  }

  signIn(userLoginFormValue: Login) {
    console.log(userLoginFormValue);
    this.authService
      .login(userLoginFormValue)
      .subscribe((response: boolean) => {
        if (response) {
          this.isLoggedIn = response;
          this.notifierService.notify('success', 'log in succesfully');
          this.welcomeUser = `Welcome ${this.getUserNameFromToken()}`;

          if (this.mainPhotoUrl.length > 0 ) {
            this.dataService.ChangeMessage(this.mainPhotoUrl);
          }

          // get returnURL if any
          const returnURL = this.route.snapshot.queryParams['returnURL'];
          this.router.navigate([returnURL || '/members']);
        }
      },
      (error: AppError) => {
        if (error instanceof UnAuthorizedError) {
          this.notifierService.notify('error', 'Please Register to login');
        } else {
          this.notifierService.notify('error', 'Something went worng... Please try again in few minutes');

        }
      });
  }

  logOut() {
    localStorage.removeItem('Token');
    this.isLoggedIn = false;
    this.notifierService.notify('success', 'log out succesfully');
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  private loadForm(builder: FormBuilder) {
    this.userLoginForm = NavComponent.buildFormGroup(builder);
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

  private getUserNameFromToken(): string {
    const token = this.jwtHelperService.tokenGetter();
    let userName = '';
    if (!this.jwtHelperService.isTokenExpired(token)) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      this.userID = decodedToken.nameid;
      this.mainPhotoUrl = decodedToken.MainPhotoURL;
      console.log(decodedToken);
      userName = decodedToken.unique_name;
    }
    return userName;
  }
}
