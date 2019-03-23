import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from './../../Model/UserDetails';
import { UserService } from './../../Shared/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: ['./member-edit-profile.component.css']
})
export class MemberEditProfileComponent implements OnInit {

  UserDetail: UserDetails;
  UserEditProfileForm: FormGroup;
  isLoading$ = new BehaviorSubject<boolean>(true);
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    const userID = this.activatedRoute.snapshot.params['id'];

    this.userService.GetUserByUserID(userID)
      .pipe(
        finalize(() => this.isLoading$.next(false))
        )
      .subscribe((response: UserDetails) => {
        this.UserDetail = response;

        this.UserEditProfileForm = this.buildEditForm(this.fb, response);
      });
  }

  private buildEditForm(builder: FormBuilder, user: UserDetails): FormGroup {
    return builder.group({
      Description: [user.Introduction, Validators.required],
      LookingFor: [user.LookingFor, Validators.required],
      Interests: [user.Interests, Validators.required],
      City: [user.City, Validators.required],
      Country: [user.Country, Validators.required]
    });
  }

  UpdateProfile(userDetail: UserDetails) {
    console.warn(userDetail);

  }

  IsValid(UserEditProfileForm: FormGroup): boolean {
    return UserEditProfileForm.invalid;
  }
  get description(): AbstractControl {
    return this.UserEditProfileForm.get('Description');
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
