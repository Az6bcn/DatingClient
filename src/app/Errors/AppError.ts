export class AppError {
  constructor(public serverError?: any) {
    console.log("Errrrrrrrrrrrr:", serverError.ErrorMessage);
    }

}
