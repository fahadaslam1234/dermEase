import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: 'app-loginSignup',
  templateUrl: './loginSignup.component.html',
  styleUrls: ['./loginSignup.component.css']
})
export class LoginSignupComponent implements OnInit {

  isLoginMode = true;
  email: string = '';
  password: string = '';
  username: string = '';
  isDermatologist = false;
  selectedFile: File | null = null;
  errorMessage: string = '';  // Store error message

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService  // Inject ToastService
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.errorMessage = '';  // Clear any previous error messages

    if (this.isLoginMode) {
      // Call login service
      this.authService.login(this.username, this.password).subscribe({
        next: (response: any) => {
          if (response.status) {
            console.log('Login successful:', response);
            // Show success toast notification
            this.toastService.showToast('Login successful!', 'success');
            // Navigate to home page upon successful login
            this.router.navigate(['/']);
          } else {
            // Handle failed login by showing message from the backend
            this.errorMessage = response.message || 'Login failed. Please try again.';
            this.toastService.showToast(this.errorMessage, 'error');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          // Show error message from backend
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
          this.toastService.showToast(this.errorMessage, 'error');
        }
      });
    } else {
      // Call signup service
      this.authService.signup(this.username, this.email, this.password, this.isDermatologist, this.selectedFile).subscribe({
        next: (response: any) => {
          if (response.status) {
            console.log('Signup successful:', response);
            // Show success toast notification
            this.toastService.showToast('Signup successful! Please log in.', 'success');
            // After successful signup, switch to login mode
            this.isLoginMode = true;
          } else {
            // Handle failed signup by showing message from the backend
            this.errorMessage = response.message || 'Signup failed. Please try again.';
            this.toastService.showToast(this.errorMessage, 'error');
          }
        },
        error: (err) => {
          console.error('Signup failed:', err);
          // Show error message from backend
          this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
          this.toastService.showToast(this.errorMessage, 'error');
        }
      });
    }
  }
}
