import { RegisterModel } from "./../Model/RegisterModel";
import { Observable } from "rxjs/Observable";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../Model/Login";
import { map, catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

@Injectable()
export class AuthService {
  private baseUrl = "http://localhost:50440/api";
  private Login = "auth/login";
  private Register = "auth/register";
  constructor(private readonly http: HttpClient) {}

  login(model: Login) {
    const url = `${this.baseUrl}/${this.Login}`;

    return this.http.post(url, model, this.getRequestOptions()).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("Token", user.tokenString);
          return true;
        }
      }),
      catchError(this.handleError)
    );
  }

  register(model: RegisterModel) {
    const url = `${this.baseUrl}/${this.Register}`;

    return this.http.post(url, model, this.getRequestOptions());
  }

  private getRequestOptions() {
    // request options for API
    const httpRequestOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "  POST",
        "Access-Control-Allow-Origin": "*"
      })
    };

    return httpRequestOptions;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    }
    if (error.status === 500) {
      // return Observable that includes an error and throw an error specific to our application domain type error (BadRequestError)
      return Observable.throw("Internal Server Error");
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return Observable.throw("Something bad happened; please try again later.");
  }
}
