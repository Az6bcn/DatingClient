import { UserDetails } from './../../../Model/UserDetails';
import { NotifierService } from 'angular-notifier';
import { UserService } from './../../../Shared/Services/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {
  UserEditProfileForm: FormGroup;
  userID: number;
  @Input() UserDetail: UserDetails;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private notifierService: NotifierService) { }

  ngOnInit() {
    if (this.UserDetail) {
      this.UserEditProfileForm = this.buildEditForm(this.fb, this.UserDetail);
    }

  }
  UpdateProfile(userDetail: UserDetails) {
    userDetail.Id = this.UserDetail.Id;

    this.userService.EditUserProfile(userDetail)
      .subscribe( (response: UserDetails) => {
        this.notifierService.notify('success', 'Profile updated successfully');
        this.UserDetail = response;
        console.warn(this.UserDetail);
      },
      error => {
        this.notifierService.notify('error', 'Something went wrong');
      });
  }

  private buildEditForm(builder: FormBuilder, user: UserDetails): FormGroup {
    return builder.group({
      Introduction: [user.Introduction, Validators.required],
      LookingFor: [user.LookingFor, Validators.required],
      Interests: [user.Interests, Validators.required],
      City: [user.City, Validators.required],
      Country: [user.Country, Validators.required]
    });
  }
  IsValid(UserEditProfileForm: FormGroup): boolean {
    return UserEditProfileForm.invalid;
  }
  get introduction(): AbstractControl {
    return this.UserEditProfileForm.get('Introduction');
  }
  get lookingfor(): AbstractControl {
    return this.UserEditProfileForm.get('LookingFor');
  }
  get interets(): AbstractControl {
    return this.UserEditProfileForm.get('Interests');
  }
  get city(): AbstractControl {
    return this.UserEditProfileForm.get('City');
  }
  get country(): AbstractControl {
    return this.UserEditProfileForm.get('Country');
  }

  /**
   *
   * @param UserEditProfileForm To - Do
   */
  // CompareFormObjectWithDBUserObject(UserEditProfileForm: FormGroup) {
  //   return Object.is(this.UserDetail, UserEditProfileForm.value);
  // }
}
