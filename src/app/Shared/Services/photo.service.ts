import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { BadRequestError } from '../../../../src/app/Errors/BadRequestError';
import { NotFoundError } from '../../../../src/app/Errors/NotFoundError';
import { UnAuthorizedError } from '../../../../src/app/Errors/UnAuthorizedError';
import { ForbiddenError } from '../../../../src/app/Errors/ForbiddenError';
import { AppError } from '../../../../src/app/Errors/AppError';
import { catchError } from 'rxjs/operators';
import { Photo } from '../../../../src/app/Model/Photo';
import { Observable, throwError as observableThrowError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
private readonly baseURL: string = environment.baseURL;
constructor(private http: HttpClient,
            private jwtHelperService: JwtHelperService) { }

private httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json', // in Angular 7 : content type by default is application/json
    'Authorization': 'Bearer ' + this.jwtHelperService.tokenGetter()
  })
};
DeletePhoto(photoID: number, userID: number) {
  const deletePhotoUrl = `/users/${userID}/photos/${photoID}`;
   const url = `${this.baseURL}${deletePhotoUrl}`;

  return this.http.delete<Photo>(url,this.httpOptions)
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
