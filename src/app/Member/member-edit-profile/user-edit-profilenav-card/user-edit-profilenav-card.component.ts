import { Photo } from './../../../Model/Photo';
import { UserDetails } from './../../../Model/UserDetails';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-edit-profilenav-card',
  templateUrl: './user-edit-profilenav-card.component.html',
  styleUrls: ['./user-edit-profilenav-card.component.css']
})
export class UserEditProfilenavCardComponent implements OnInit {
@Input() userDetailToEdit: UserDetails;
@Output() userDetailToEditChange = new EventEmitter<UserDetails>();
showEditProfileDiv =  false;
showEditPhotosDiv = false;

  constructor() { }

  ngOnInit() {
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

  PhotoChanged(photos: Array<Photo>) {
    const newMain = photos.find(p => p.IsMain === true);

    this.userDetailToEdit.Photos = photos;
    this.userDetailToEdit.PhotoUrl = newMain.Url;

    this.userDetailToEditChange.emit(this.userDetailToEdit);
  }
}
