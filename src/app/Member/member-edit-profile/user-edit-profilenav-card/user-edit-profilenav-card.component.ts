import { UserDetails } from './../../../Model/UserDetails';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-edit-profilenav-card',
  templateUrl: './user-edit-profilenav-card.component.html',
  styleUrls: ['./user-edit-profilenav-card.component.css']
})
export class UserEditProfilenavCardComponent implements OnInit {
@Input() userDetailToEdit: UserDetails;
showEditProfileDiv =  false;
showEditPhotosDiv = false;

  constructor() { }

  ngOnInit() {
    console.log(this.userDetailToEdit);
    if (this.userDetailToEdit !== null) this.showEditProfileDiv = true;
  }
  showEditProfile(): boolean {
    this.showEditPhotosDiv = false;
    return this.showEditProfileDiv = !this.showEditProfileDiv;
  }
  showEditPhotos(): boolean {
    this.showEditProfileDiv = false;
    return this.showEditPhotosDiv = !this.showEditPhotosDiv;
  }

}
