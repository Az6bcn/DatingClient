import { PaginatedResult, Pagination } from './../../Model/Pagination';

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/Services/user.service';
import { User } from '../../Model/User';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 Users = Array<User>();
 paginationInfo: Pagination;
 isLoading$ = new BehaviorSubject<boolean>(true);
 page: number;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUsers()
    .pipe(
      finalize( () => this.isLoading$.next(false))
    )
    .subscribe((response: PaginatedResult<Array<User>>) => {
      this.paginationInfo = response.pagination;

      this.Users = response.result;
      this.Users.forEach(x => {
          if (x.PhotoURL === null) {
            x.PhotoURL =  '../../../../../assets/user.png';
          }
      });
    });
  }

  PageChanged(page: number) {
    console.log(page);
    this.paginationInfo.currentPage = page['page'];
    this.paginationInfo.itemsPerPage = page['itemsPerPage'];

    this.LoadData(this.paginationInfo);
  }

  LoadData(paginationInfo: Pagination) {
    this.userService.GetUsers(paginationInfo.currentPage, paginationInfo.itemsPerPage)
      .subscribe( response => {
        this.Users = response.result;
        //this.paginationInfo = response.pagination;
      });
  }
}
