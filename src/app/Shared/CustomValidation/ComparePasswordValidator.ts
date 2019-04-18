import { FormGroup, ValidationErrors } from '@angular/forms';
export class ComparePasswordValidator {
  static PasswordMatchValidator(formGroup: FormGroup): ValidationErrors | null {

    let password = '';
    let confirmPassword = '';

      console.log(formGroup);
      // get the two password controls
      if (formGroup.get('Password').valid) {
        password = formGroup.get('Password').value;
      }
      console.log(password);

      if (formGroup.get('ConfirmPassword').valid){
        confirmPassword = formGroup.get('ConfirmPassword').value;
      }

      const response =  (password === confirmPassword) ? null : {'MatchPasswordError': 'The password does not match'};

      return response;
  }
}
