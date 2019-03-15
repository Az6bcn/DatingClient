import { environment } from './../../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../Model/User';
import { Observable, throwError as observableThrowError,} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BadRequestError } from '../../Errors/BadRequestError';
import { NotFoundError } from '../../Errors/NotFoundError';
import { UnAuthorizedError } from '../../Errors/UnAuthorizedError';
import { ForbiddenError } from '../../Errors/ForbiddenError';
import { AppError } from '../../Errors/AppError';
import { UserDetails } from '../../Model/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.baseURL;
  private readonly allUsers = 'users/getusers';
  private readonly userByID = 'users/getuserbyid';
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.jwtHelperService.tokenGetter()
    })
  };


  /**
  * Gets all Users, Returns Observable<User[]>
  */
  GetUsers(): Observable<Array<User>> {
    const url = `${this.baseUrl}/${this.allUsers}`;

    return this.http.get<Array<User>>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  GetUserByUserID(id: number): Observable<UserDetails> {
    const url = `${this.baseUrl}/${this.userByID}/${id}`;

    return this.http.get<UserDetails>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    // /* Handling Expected Error (Imagine we sending invalid data to the Server response will be Bad Request, status code 400)
             // check the status of the response  */
    console.log(error);
    if (error.status === 400) {
      // return Observable that includes an error and throw an error specific to our application domain type error (BadRequestError)
      return observableThrowError(new BadRequestError(error));
    }

    /* Handling Expected Error (The post might already been deleted and the Server response will be Not found, status code 404):
                check the status of the response )*/
    if (error.status === 404) {
      // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
      return observableThrowError(new NotFoundError());
    }

    if (error.status === 401) {
      // return Observable that includes an error and throw an error specific to our application domain type error (UnAuthoriseError)
      return observableThrowError(new UnAuthorizedError(error));
    }

    /* 403 ==> Forbidden, credentials correct, authentification correct but maybe
                  people with user role can't access/restricted from the resource */
    if (error.status === 403) {
      // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
      return observableThrowError(new ForbiddenError(error));
    }

    // return Observable that includes an error and throw an error (unknown) to our application  domain type error (AppError)

    return observableThrowError(new AppError(error));
  }
}