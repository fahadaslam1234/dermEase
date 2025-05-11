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
  confirmPassword: string = '';
  username: string = '';
  isDermatologist = false;
  isVendor = false;
  isPatient: boolean = false;
  selectedFile: File | null = null;

  // Validation Errors
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  usernameError: string = '';
  fileError: string = '';

  // Password visibility toggles
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearErrors();
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.username = '';
    this.isDermatologist = false;
    this.isVendor = false;
    this.isPatient = false;
    this.selectedFile = null;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onCheckboxChange(checkboxType: string): void {
    if (checkboxType === 'isDermatologist') {
      this.isVendor = false;
      this.isPatient = false;
    } else if (checkboxType === 'isVendor') {
      this.isDermatologist = false;
      this.isPatient = false;
    } else if (checkboxType === 'isPatient') {
      this.isDermatologist = false;
      this.isVendor = false;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  validateForm(): boolean {
    this.clearErrors();
    let isValid = true;

    if (!this.username || this.username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters.';
      isValid = false;
    }
    else if (!/[a-zA-Z]/.test(this.username)) {
      this.usernameError = 'Username must contain at least one alphabet.';
      isValid = false;
    }


    if (!this.password || this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (!this.isLoginMode) {
      if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!this.confirmPassword || this.confirmPassword !== this.password) {
        this.confirmPasswordError = 'Passwords do not match.';
        isValid = false;
      }
    }

    return isValid;
  }

  clearErrors(): void {
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.usernameError = '';
    this.errorMessage = '';
    this.fileError = '';
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.validateForm()) {
      this.toastService.showToast('Please correct the errors in the form.', 'danger');
      return;
    }

    this.errorMessage = '';

    if (this.isLoginMode) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toastService.showToast('Login successful!', 'success');
            this.router.navigate(['']);
          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
            this.toastService.showToast(this.errorMessage, 'danger');
          }
        },
        error: () => {
          this.toastService.showToast('Incorrect username or password. Please try again.', 'danger');
        }
      });
    } else {
      this.authService.signup(this.username, this.email, this.password, this.isDermatologist, this.isVendor, this.selectedFile).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toastService.showToast('Signup Successful! Please log in.', 'success');
            this.isLoginMode = true;
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

  toFogetPassword() {
    this.router.navigate(['forgetPassword']);
  }
}
