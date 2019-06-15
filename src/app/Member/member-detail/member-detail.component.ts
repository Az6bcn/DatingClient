import { AppError } from './../../Errors/AppError';
import { BadRequestError } from './../../Errors/BadRequestError';
import { UserDetails } from './../../Model/UserDetails';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  UserDetail: UserDetails;
  constructor(private router: ActivatedRoute, private notifierService: NotifierService) { }

  ngOnInit() {
    this.router.data
        .subscribe( data => {
        if (data.userDetail) {
          this.UserDetail = data.userDetail;
        }
      });
    }


}
