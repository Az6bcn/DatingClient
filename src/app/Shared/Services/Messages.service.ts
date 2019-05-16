import { User } from './../../Model/User';
import { MessageReturned } from './../../Model/MessageReturned';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppError } from './../../Errors/AppError';
import { ForbiddenError } from './../../Errors/ForbiddenError';
import { UnAuthorizedError } from './../../Errors/UnAuthorizedError';
import { NotFoundError } from './../../Errors/NotFoundError';
import { BadRequestError } from './../../Errors/BadRequestError';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private readonly baseURL: string = environment.baseURL;
constructor(private http: HttpClient,
            private jwtHelperService: JwtHelperService) { }

private httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':  'application/json', // in Angular 7 : content type by default is application/json
    'Authorization': 'Bearer ' + this.jwtHelperService.tokenGetter()
  })
};

GetInboxMessages(userID: number): Observable<Array<MessageReturned>> {
  const inboxUrl = `/messages/${userID}/inbox`;
  const url = `${this.baseURL}/${inboxUrl}`;

  return this.http.get<Array<MessageReturned>>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
      );
}

GetOutboxMessages(userID: number): Observable<Array<MessageReturned>> {
  const inboxUrl = `/messages/${userID}/outbox`;
  const url = `${this.baseURL}/${inboxUrl}`;

  return this.http.get<Array<MessageReturned>>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
      );
}

Delete(messageID: number, userID: number) {
  const deleteUrl = '/messages/${userID}';
  const url = `${this.baseURL}/${deleteUrl}`;

  const params = new HttpParams().append('messageID', messageID.toString());

  const options = {params: params,
                   headers: new HttpHeaders({'Authorization': 'Bearer ' + this.jwtHelperService.tokenGetter()
                    })
                  };

  return this.http.delete(url, options)
  .pipe(
    catchError(this.handleError)
    );
}

// GetAllUnReadMessages(userID:): Observable<Array<MessageReturned>> {
//   const inboxUrl = `/messages/${userID}/unread`;
//   const url = `${this.baseURL}/${inboxUrl}`;

//   return this.http.get<MessageReturned>(url, this.httpOptions)
//     .pipe(
//       catchError(this.handleError)
//       );
// }

// SendMessages(userID: number, message: MessageToSend): Observable<MessageReturned> {

// }
private handleError(error: HttpErrorResponse) {
  // /* Handling Expected Error (Imagine we sending invalid data to the Server response will be Bad Request, status code 400)
           // check the status of the response  */
  console.log(error);
  if (error.status === 400) {
    // return Observable that includes an error and throw an error specific to our application domain type error (BadRequestError)
    return throwError(new BadRequestError(error));
  }

  /* Handling Expected Error (The post might already been deleted and the Server response will be Not found, status code 404):
              check the status of the response )*/
  if (error.status === 404) {
    // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
    return throwError(new NotFoundError());
  }

  if (error.status === 401) {
    // return Observable that includes an error and throw an error specific to our application domain type error (UnAuthoriseError)
    return throwError(new UnAuthorizedError(error));
  }

  /* 403 ==> Forbidden, credentials correct, authentification correct but maybe
                people with user role can't access/restricted from the resource */
  if (error.status === 403) {
    // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
    return throwError(new ForbiddenError(error));
  }

  // return Observable that includes an error and throw an error (unknown) to our application  domain type error (AppError)

  return throwError(new AppError(error));
}

}
