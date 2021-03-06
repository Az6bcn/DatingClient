import { environment } from './../../../environments/environment';
import { BadRequestError } from './../../Errors/BadRequestError';
import { NotFoundError } from './../../Errors/NotFoundError';
import { UnAuthorizedError } from './../../Errors/UnAuthorizedError';
import { AppError } from './../../Errors/AppError';
import { ForbiddenError } from './../../Errors/ForbiddenError';
import { RegisterModel } from './../../Model/RegisterModel';
import { Login } from './../../Model/Login';


import {throwError as observableThrowError,  Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private readonly baseUrl = environment.baseURL;
  private Login = 'auth/login';
  private Register = 'auth/register';
  constructor(private readonly http: HttpClient) {}

  login(model: Login) {
    const url = `${this.baseUrl}/${this.Login}`;

    return this.http.post(url, model, this.getRequestOptions()).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('Token', user.tokenString);
          return true;
        }
      }),
      catchError(this.handleError)
    );
  }

  register(model: RegisterModel) {
    const url = `${this.baseUrl}/${this.Register}`;

    return this.http
      .post(url, model, this.getRequestOptions())
      .pipe(catchError(this.handleError));
  }

  private getRequestOptions() {
    // request options for API
    const httpRequestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': '  POST',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return httpRequestOptions;
  }

  private handleError(error: HttpErrorResponse) {
    /* Handling Expected Error (Imagine we sending invalid data to the Server response will be Bad Request, status code 400)
              check the status of the response  */
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
