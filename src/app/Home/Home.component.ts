import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-Home",
  templateUrl: "./Home.component.html",
  styleUrls: ["./Home.component.css"]
})
export class HomeComponent implements OnInit {
  showRegister = false;

  constructor() {}

  ngOnInit() {}

  registerToggle() {
    this.showRegister = !this.showRegister;
  }

  canceledEvent(canceledEventValue: boolean) {
    this.showRegister = canceledEventValue;
  }
}
