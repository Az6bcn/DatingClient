import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.css']
})
export class UserAboutComponent implements OnInit {
@Input() userIntro: string;
@Input() userLookingFor: string;
  constructor() { }

  ngOnInit() {
  }

}
