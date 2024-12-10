import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private toastService: ToastService) {}

  ngOnInit() {
  }

  emailError:string = '';
  email: string = '';
  message: string = '';
  error: string = '';



  onSubmit() {
    console.log(this.email);
    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        console.log(response);
        this.message = response.message;
        this.toastService.showToast(this.message, 'success');
        this.error = '';
      },
      error: (err) => {
        this.error = err.error.message || 'An error occurred.';
        this.toastService.showToast(this.error, 'danger');
        this.message = '';
      },
    });
  }

}
