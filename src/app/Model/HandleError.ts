// import { HttpErrorResponse } from '@angular/common/http';
// import { BadRequestError } from '../Errors/BadRequestError';
// import { NotFoundError } from '../Errors/NotFoundError';
// import { UnAuthorizedError } from '../Errors/UnAuthorizedError';
// import { ForbiddenError } from '../Errors/ForbiddenError';
// import { AppError } from '../Errors/AppError';

// export class HandleError {

// public handleError(error: HttpErrorResponse) {
//   /* Handling Expected Error (Imagine we sending invalid data to the Server response will be Bad Request, status code 400)
//             check the status of the response  */
//   if (error.status === 400) {
//     // return Observable that includes an error and throw an error specific to our application domain type error (BadRequestError)
//     return observableThrowError(new BadRequestError(error));
//   }

//   /* Handling Expected Error (The post might already been deleted and the Server response will be Not found, status code 404):
//               check the status of the response )*/
//   if (error.status === 404) {
//     // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
//     return observableThrowError(new NotFoundError());
//   }

//   if (error.status === 401) {
//     // return Observable that includes an error and throw an error specific to our application domain type error (UnAuthoriseError)
//     return observableThrowError(new UnAuthorizedError(error));
//   }

//   /* 403 ==> Forbidden, credentials correct, authentification correct but maybe
//                 people with user role can't access/restricted from the resource */
//   if (error.status === 403) {
//     // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
//     return observableThrowError(new ForbiddenError(error));
//   }

//   // return Observable that includes an error and throw an error (unknown) to our application  domain type error (AppError)
//   return observableThrowError(new AppError(error));
// }
// }
