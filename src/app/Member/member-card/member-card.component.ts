import { NotifierService } from 'angular-notifier';
import { UserService } from './../../Shared/Services/user.service';

import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../Model/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() userModel: Array<User>;
  constructor(private userService: UserService,
    private notifierService: NotifierService) { }

  ngOnInit() {
    console.log('model', this.userModel);
  }

  SendLike(likeeUserID: number, userKnownAs: string) {
    console.log(likeeUserID);
    // get current userID
    const currentUserID = this.userService.GetCurrentUserID();

    this.userService.SendLike(currentUserID, likeeUserID)
    .subscribe(res => {
      this.notifierService.notify('success', `You have liked ${userKnownAs}`);
    },
    error => {
      this.notifierService.notify('error', 'something has gone wrong');
    });
  }
}
