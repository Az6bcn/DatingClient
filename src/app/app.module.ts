import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Home/Home.component';
import { RegisterComponent } from './Register/Register.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuardService } from './Guards/auth-guard.service';
import { MemberCardComponent } from './Member/member-card/member-card.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { NavComponent } from './Core/nav/nav.component';
import { AuthService } from './Core/Services/auth.service';
import { SpinnerComponent } from './Shared/Components/spinner/spinner.component';


@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent, MemberListComponent,
    ListComponent, MessagesComponent, MemberCardComponent, SpinnerComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, NotifierModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: () => {
            return localStorage.getItem('Token');
          }
      }
  }), BsDropdownModule.forRoot(), RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'matches', component: MemberListComponent, canActivate: [AuthGuardService]},
    {path: 'lists', component: ListComponent, canActivate: [AuthGuardService]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]},
    {path: '**', component: HomeComponent}
  ])],
  providers: [AuthService, JwtHelperService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
