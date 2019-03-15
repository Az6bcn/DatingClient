import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.css']
})
export class UserInterestsComponent implements OnInit {

  @Input() userInterest: string;

  constructor() { }

  ngOnInit() {
  }

}
