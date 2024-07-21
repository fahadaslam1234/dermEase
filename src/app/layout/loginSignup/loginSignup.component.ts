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

  constructor() {}

  ngOnInit(): void {}

    onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
    }
  
    onSubmit() {
      if (this.isLoginMode) {
        // Handle login logic
      } else {
        // Handle signup logic
      }
    }

}
