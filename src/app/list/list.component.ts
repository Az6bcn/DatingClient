import { BehaviorSubject } from 'rxjs';
import { UserService } from './../Shared/Services/user.service';
import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userID: number;
  likersOfUser: Array<User>;
  likedByUser: Array<User>;
  isLikee: boolean;
  isLiker: boolean;
  isLoading$ = new BehaviorSubject<boolean>(true);
  likeeIsActive = false;
  likersIsActive = true;
  constructor(private userService: UserService) { }

  ngOnInit() {
    // get userID
    this.userID = this.userService.GetCurrentUserID();

    if (this.userID > 0) {
      this.userService.GetUserLikers(this.userID)
      .pipe(
        finalize(() => this.isLoading$.next(false))
        )
      .subscribe( response => {
        this.likedByUser = response;
        this.isLiker = true;
      });
    }

  }


  GetLikees() {
    this.isLiker = false;
    this.likersIsActive = false;
    this.likeeIsActive = true;

    this.userService.GetUserLikees(this.userID)
      .pipe(
      finalize(() => this.isLoading$.next(false))
      )
      .subscribe( response => {
        this.likersOfUser = response;
        this.isLikee = true;
      });
  }

  GetLikers() {
    this.isLikee = false;
    this.likeeIsActive = false;
    this.likersIsActive = true;

    this.userService.GetUserLikers(this.userID)
      .pipe(
        finalize(() => this.isLoading$.next(false))
        )
      .subscribe( response => {
        this.likedByUser = response;
        this.isLiker = true;
      });
  }
}
