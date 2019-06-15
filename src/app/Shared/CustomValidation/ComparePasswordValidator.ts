import { FormGroup, ValidationErrors } from '@angular/forms';
export class ComparePasswordValidator {
  static PasswordMatchValidator(formGroup: FormGroup): ValidationErrors | null {

    let password = '';
    let confirmPassword = '';

      // get the two password controls
      if (formGroup.get('Password').valid) {
        password = formGroup.get('Password').value;
      }


      if (formGroup.get('ConfirmPassword').valid) {
        confirmPassword = formGroup.get('ConfirmPassword').value;
      }


      const response =  (password === confirmPassword) ? null : {'MatchPasswordError': 'The password does not match'};

      return response;
  }
}
