import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { HomeComponent } from './Home/Home.component';
import { RegisterComponent } from './Register/Register.component';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuardService } from './Guards/auth-guard.service';


@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent, MemberListComponent, ListComponent, MessagesComponent],
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
