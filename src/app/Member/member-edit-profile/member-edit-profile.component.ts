import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from './../../Model/UserDetails';
import { UserService } from './../../Shared/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ɵConsole, ViewChild, AfterViewInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: ['./member-edit-profile.component.css']
})
export class MemberEditProfileComponent implements OnInit {

  UserDetail: UserDetails;
  UserEditProfileForm: FormGroup;

  userID: number;
  isLoading$ = new BehaviorSubject<boolean>(true);
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.params['id'];

    if (this.userID) {
    this.userService.GetUserByUserID(this.userID)
      .pipe(
        finalize(() => this.isLoading$.next(false))
        )
      .subscribe((response: UserDetails) => {
        this.UserDetail = response;
        console.log(this.UserDetail);
      });
    }
  }
}
