import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  showRegister = false;

  constructor(private jwtHelperService: JwtHelperService) {}

  ngOnInit() {
  }

  registerToggle() {
    this.showRegister = !this.showRegister;
  }

  canceledEvent(canceledEventValue: boolean) {
    this.showRegister = canceledEventValue;
  }

  isLoggedIn (): boolean {
    return this.jwtHelperService.tokenGetter() != null ? true : false;
  }
}
