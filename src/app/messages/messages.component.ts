import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageReturned } from './../Model/MessageReturned';
import { UserService } from './../Shared/Services/user.service';
import { MessagesService } from './../Shared/Services/Messages.service';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messageToDisplay = new Array<MessageReturned>();
  userID: number;
  outboxIsActive: {};
  inboxIsActive: {};
  unreadIsActive: {};
  constructor(private messageService: MessagesService,
              private userService: UserService,
              private notifierService: NotifierService) { }
  classObject = {unread: false, inbox: false, outbox: false};

  ngOnInit() {
    this.unreadIsActive = this.generateClassObject(true, false, false);

    this.userID = this.userService.GetCurrentUserID();

    this.messageService.GetInboxMessages(this.userID)
      .pipe(
        map( x => {
          return x.filter (y => y.IsRead === false);
        })
      )
      .subscribe(resp => {
        this.messageToDisplay = resp;
      });
  }
  Unread() {
    this.unreadIsActive = true;
    this.inboxIsActive = false;
    this.outboxIsActive = false;

    this.messageService.GetInboxMessages(this.userID)
    .pipe(
      map( x => {
        return x.filter (y => y.IsRead === false);
      })
    )
    .subscribe(resp => {
      this.messageToDisplay = resp;
    });
  }

  Inbox() {
    this.inboxIsActive = true;
    this.unreadIsActive = false;
    this.outboxIsActive = false;

    this.messageService.GetInboxMessages(this.userID)
    .subscribe(resp => {
      this.messageToDisplay = resp;
    });
  }

  Outbox() {
    this.inboxIsActive = false;
    this.unreadIsActive = false;
    this.outboxIsActive = true;

    this.messageService.GetOutboxMessages(this.userID)
    .subscribe(resp => {
      this.messageToDisplay = resp;
    });
  }

  generateClassObject(unread: boolean, inbox: boolean, outbox: boolean) {
     return this.classObject = {unread: unread, inbox: inbox, outbox: outbox};
  }

  onSort(event ) {
  }

  Delete(messageID: number) {
    this.messageService.Delete(messageID, this.userID)
      .subscribe(res => {
        this.notifierService.notify('success', 'message deleted successfully');
      });
  }
}
