import { NotifierService } from 'angular-notifier';

import { UserService } from './../Services/user.service';
import { User } from './../../Model/User';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError, switchMap, take, mergeMap } from 'rxjs/operators';
import { UserDetails } from './../../Model/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService implements Resolve<User> {
//userDetails: Observable<UserDetails>;
  constructor(private userService: UserService,
              private notifierService: NotifierService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<any> {
    // get id from current url
    const userID = route.params['id'];

    return this.userService.GetUserByUserID(userID);

    // .pipe(
    //   take(1),
    //   mergeMap(userDetails => {
    //   console.log('userDetailsFound', userDetails);
    //   return of(userDetails);
    // },(
    //   error => {
    //     this.notifierService.notify('error', 'User details not found');
    //     return EMPTY;
    //   }
    //   );
  }

}
