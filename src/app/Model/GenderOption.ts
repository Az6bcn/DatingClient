import {IOption} from 'ng-select';
export class GenderOption implements IOption {
  value: string;
  label: string;
  disabled?: boolean;


  getGenderOptions() {
    return new Array<IOption>({label: 'Male', value: 'male'}, {label: 'Female', value: 'female'});
  }
}
