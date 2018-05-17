export class AppError {
  constructor(serverError?: any) {
    console.log("Errrrrrrrrrrrr:", serverError.error.errorMessage);
    // extracts the json in the error (only if json present in error)
  }
}
