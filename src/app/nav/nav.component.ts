import { AuthService } from "./../Services/auth.service";
import { Login } from "./../Model/Login";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  userLoginForm: FormGroup;
  isLoggedIn: boolean;
  welcomeUser: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.loadForm(this.fb);
  }

  signIn(userLoginFormValue: Login) {
    console.log(userLoginFormValue);
    this.authService.login(userLoginFormValue).subscribe(
      (response: boolean) => {
        if (response) {
          this.isLoggedIn = response;
          this.welcomeUser = `Welcome ${userLoginFormValue.username}`;
        }
      },
      error => console.log("ERRRRRRRRRRRRRRR : ", error)
    );
  }

  logOut() {
    localStorage.removeItem("Token");
    this.isLoggedIn = false;
    alert("loggedOut");
  }
  private loadForm(builder: FormBuilder) {
    this.userLoginForm = NavComponent.buildFormGroup(builder);
  }

  /**
   * Check if there's any user logged-in
   */
  checkIfUserLoggedIn(): boolean {
    const token = localStorage.getItem("Token");
    return !!token;
  }

  // tslint:disable-next-line:member-ordering
  private static buildFormGroup(builder: FormBuilder) {
    return builder.group({
      userLogin: builder.group({
        username: ["", [Validators.required]],
        password: ["", Validators.required]
      })
    });
  }
}
