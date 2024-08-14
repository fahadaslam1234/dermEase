import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginSignup',
  templateUrl: './loginSignup.component.html',
  styleUrls: ['./loginSignup.component.css']
})
export class LoginSignupComponent implements OnInit {

  isLoginMode = true;
  email: string = '';
  password: string = '';
  username:string = '';
  isDermatologist=false;

  constructor() {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    // Add your login/signup logic here
  }

}
