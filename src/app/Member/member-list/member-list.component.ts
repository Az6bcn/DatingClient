
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { PaginatedResult, Pagination } from './../../Model/Pagination';

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/Services/user.service';
import { User } from '../../Model/User';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { GenderOption } from './../../Model/GenderOption';
import { IOption } from 'ng-select';
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
 filterForm: FormGroup;
 genderOption;
 infinity = 'inifinity';

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.genderOption = new GenderOption().getGenderOptions();
    console.log('genderOption', this.genderOption);
    this.LoadFilterForm(this.formBuilder);
    console.log(this.filterForm.value);
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

  ApplyFilter(filterFormData) {
    this.userService.GetUsers(null, 5, filterFormData['ageFrom'], filterFormData['ageTo'], filterFormData['gender'])
      .subscribe( response => {
        this.Users = response.result;
        this.paginationInfo = response.pagination;
      });
    console.log('filter data', filterFormData);
  }

  ResetFilter() {
    this.filterForm.reset();
    this.isValid(this.filterForm);
  }
  LoadFilterForm(fb: FormBuilder) {
    this.filterForm = MemberListComponent.filterForm(fb);
  }

  // tslint:disable-next-line:member-ordering
  private static filterForm(fb: FormBuilder) {
    return fb.group({
      ageFrom: [18, Validators.min(18) ],
      ageTo: [99, [Validators.min(18), Validators.max(90)]],
      gender: ['']
    });
  }

get minAge(): AbstractControl{
  return this.filterForm.get('ageFrom');
}

get maxAge(): AbstractControl{
  return this.filterForm.get('ageTo');
}

isValid(filterFormData: FormGroup): boolean {
  return filterFormData.invalid;
}
}
