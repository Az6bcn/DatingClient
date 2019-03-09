
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/Services/user.service';
import { User } from '../../Model/User';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 Users = Array<User>();
 isLoading$ = new BehaviorSubject<boolean>(true);
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUsers()
    .pipe(
      finalize( () => this.isLoading$.next(false))
    )
    .subscribe(response => {
      this.Users = response;
    });
  }

}
