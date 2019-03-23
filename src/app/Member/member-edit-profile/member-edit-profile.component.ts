import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from './../../Model/UserDetails';
import { UserService } from './../../Shared/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: ['./member-edit-profile.component.css']
})
export class MemberEditProfileComponent implements OnInit {

  UserDetail: UserDetails;
  UserEditProfileForm: FormGroup;
  isLoading$ = new BehaviorSubject<boolean>(true);
  userID: number;
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.params['id'];

    if (this.userID) {
    this.userService.GetUserByUserID(this.userID)
      .pipe(
        finalize(() => this.isLoading$.next(false))
        )
      .subscribe((response: UserDetails) => {
        this.UserDetail = response;

        this.UserEditProfileForm = this.buildEditForm(this.fb, response);
      });
    }
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

  UpdateProfile(userDetail: UserDetails) {
    userDetail.Id = this.userID;

    this.userService.EditUserProfile(userDetail)
      .subscribe( (response: UserDetails) => {
        this.notifierService.notify('success', 'Profile updated successfully');
        console.log('updatedProfile', response);
      },
      error => {
        this.notifierService.notify('error', 'Something went wrong');
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
  CompareFormObjectWithDBUserObject(UserEditProfileForm: FormGroup) {
    return Object.is(this.UserDetail, UserEditProfileForm.value);
  }
}
