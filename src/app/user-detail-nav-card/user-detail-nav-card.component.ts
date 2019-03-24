import { UserDetails } from './../Model/UserDetails';
import { Component, OnInit, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-detail-nav-card',
  templateUrl: './user-detail-nav-card.component.html',
  styleUrls: ['./user-detail-nav-card.component.css']
})
export class UserDetailNavCardComponent implements OnInit {

  showInterestsDiv = false;
  showAboutDiv = false;
  showMessagesDiv = false;

  showPhotosDiv = false;
  @Input() userDetails: UserDetails;

  constructor() { }

  ngOnInit() {
    if (this.userDetails) this.showAboutDiv = true;
  }
  showInterests(): boolean {
    this.showAboutDiv = false;
    this.showMessagesDiv = false;
    this.showPhotosDiv = false;
    return this.showInterestsDiv = !this.showInterestsDiv;
  }
  showAbout(): boolean {
    this.showInterestsDiv = false;
    this.showMessagesDiv = false;
    this.showPhotosDiv = false;
    return this.showAboutDiv = !this.showAboutDiv;
  }
  showMessage(): boolean {
    this.showInterestsDiv = false;
    this.showAboutDiv = false;
    this.showPhotosDiv = false;
    return this.showMessagesDiv = !this.showMessagesDiv;
  }

  showPhotos(): boolean {
    this.showInterestsDiv = false;
    this.showAboutDiv = false;
    this.showMessagesDiv = false;
    return this.showPhotosDiv = !this.showPhotosDiv;
  }
}
