import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './../Services/user.service';
import { User } from './../../Model/User';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserDetails } from './../../Model/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService implements Resolve<User> {
userDetails: Observable<UserDetails>;
  constructor(private userService: UserService,
              private notifierService: NotifierService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<any> {
    // get id from current url
    const userID = route.params['id'];

     this.userService.GetUserByUserID(userID)
      .subscribe( userDetails => {
          this.userDetails = of(userDetails);
      },
      error => {
        this.notifierService.notify('error', 'User details not found');
        this.userDetails = EMPTY;
      }
      );
      return this.userDetails;
  }

}
