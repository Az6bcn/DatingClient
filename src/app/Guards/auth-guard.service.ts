import { NotifierService } from 'angular-notifier';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

    constructor(private router: Router,
                private jwtHelperService: JwtHelperService,
                private notifierService: NotifierService ) { }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const tokenExpired = this.jwtHelperService.isTokenExpired();

      if (!tokenExpired) {
        return true;
      }
      else {
        this.notifierService.notify('error', 'You need to be logged in to access this area');

        //get the returnUrl to navigate user to after successgul log in
        const returnURL = state.url;

        this.router.navigate(['/'], {queryParams: {returnURL: returnURL}});
        return false;
      }
    }

}
