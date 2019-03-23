import { UserDetailResolverService } from './Shared/Resolvers/user-detail-resolver.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
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
import { MemberDetailComponent } from './Member/member-detail/member-detail.component';
import { UserInterestsComponent } from './user-interests/user-interests.component';
import { UserPhotosComponent } from './user-photos/user-photos.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { UserDetailNavCardComponent } from './user-detail-nav-card/user-detail-nav-card.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditProfileComponent } from './Member/member-edit-profile/member-edit-profile.component';


@NgModule({
  declarations: [AppComponent,
                 NavComponent,
                 HomeComponent,
                 RegisterComponent,
                 MemberListComponent,
                 ListComponent,
                 MessagesComponent,
                 MemberCardComponent,
                 SpinnerComponent,
                 MemberDetailComponent,
                 UserInterestsComponent,
                 UserPhotosComponent,
                 UserMessagesComponent,
                 UserAboutComponent,
                 UserDetailNavCardComponent,
                 MemberEditProfileComponent
                 ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, NotifierModule, NgxGalleryModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: () => {
            return localStorage.getItem('Token');
          }
      }
  }), BsDropdownModule.forRoot(), RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {userDetail: UserDetailResolverService}},
    {path: 'members/:id/edit-profile', component: MemberEditProfileComponent},
    {path: 'members', component: MemberListComponent, canActivate: [AuthGuardService]},
    {path: 'lists', component: ListComponent, canActivate: [AuthGuardService]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]},
    {path: '**', component: MemberListComponent, canActivate: [AuthGuardService]}
  ])],
  providers: [AuthService, JwtHelperService, AuthGuardService, UserDetailResolverService],
  bootstrap: [AppComponent]
})
export class AppModule {}
