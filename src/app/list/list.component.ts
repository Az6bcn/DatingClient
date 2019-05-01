import { UserService } from './../Shared/Services/user.service';
import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';

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
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUserLikers(1)
      .subscribe( response => {
        this.likedByUser = response;
        this.isLiker = true;
        console.table(response);
      });
    // get userID
  }


  GetLikees() {
    this.isLiker = false;

    this.userService.GetUserLikees(1)
      .subscribe( response => {
        this.likersOfUser = response;
        this.isLikee = true;
        console.log(response);
      });
  }

  GetLikers() {
    this.isLikee = false;

    this.userService.GetUserLikers(1)
      .subscribe( response => {
        this.likedByUser = response;
        this.isLiker = true;
        console.table(response);
      });
  }
}
