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
  isVendor = false;
  selectedFile: File | null = null;

  // Validation Errors
  errorMessage: string = ''; // Store error message
  emailError: string = '';
  passwordError: string = '';
  usernameError: string = '';
  fileError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearErrors(); // Clear errors when switching modes
    this.email = '';
    this.password = '';
    this.username = '';
    this.isDermatologist = false;
    this.isVendor = false;
    this.selectedFile = null;
  }

  onCheckboxChange(checkboxType: string): void {
    if (checkboxType === 'isDermatologist') {
      this.isVendor = false; // Uncheck Vendor checkbox
    } else if (checkboxType === 'isVendor') {
      this.isDermatologist = false; // Uncheck Dermatologist checkbox
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  validateForm(): boolean {
    this.clearErrors(); // Reset all error messages

    let isValid = true; // Track overall validation status

    // Email validation
    if (!this.isLoginMode) {
    if (!this.email || !this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.emailError = 'Please enter a valid email address.';
      isValid = false;
    }
  }

    // Password validation
    if (!this.password || this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    if (!this.isLoginMode) {
      // Username validation for signup
      if (!this.username) {
        this.usernameError = 'Username is required.';
        isValid = false;
      }
    }

    return isValid; // Return overall validation status
  }

  clearErrors(): void {
    this.emailError = '';
    this.passwordError = '';
    this.usernameError = '';
    this.errorMessage = '';
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.validateForm()) {
      this.toastService.showToast('Please correct the errors in the form.', 'danger');
      return; // Stop submission if form is invalid
    }

    this.errorMessage = ''; // Clear any previous errors

    if (this.isLoginMode) {
      // Handle login
      this.authService.login(this.username, this.password).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toastService.showToast('Login successful!', 'success');
            // window.location.reload();
              this.router.navigate(['']);


          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
            this.toastService.showToast(this.errorMessage, 'danger');
          }
        },
        error: () => {
          this.toastService.showToast('An error occurred during login. Please try again.', 'danger');
        }
      });
    } else {
      // Handle signup
      this.authService.signup(this.username, this.email, this.password, this.isDermatologist, this.isVendor, this.selectedFile).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toastService.showToast('Signup Successful! Please log in.', 'success');
            this.isLoginMode = true; // Switch to login mode
          } else {
            this.toastService.showToast(response.message || 'Signup failed. Please try again.', 'danger');
          }
        },
        error: () => {
          this.toastService.showToast('An error occurred during signup. Please try again.', 'danger');
        }
      });
    }
  }

  toFogetPassword()
  {
    this.router.navigate(['forgetPassword']);
  }
}
