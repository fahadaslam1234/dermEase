import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  passwordError: string = '';
  message: string = '';
  error: string = '';
  token: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute,private toastService: ToastService) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response) => {
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
