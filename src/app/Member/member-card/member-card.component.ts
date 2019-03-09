
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../Model/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() userModel: Array<User>;
  constructor() { }

  ngOnInit() {
    console.log('model', this.userModel);
  }

}
