import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService, private toastService : ToastService) {
    // Initialize the form group with form controls
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(): void {
    console.log('Form Submitted!');
    console.log('Form Valid:', this.contactForm.valid);
    console.log('Form Data:', this.contactForm.value);

    // Check validation errors
    console.log('Name Errors:', this.contactForm.get('name')?.errors);
    console.log('Email Errors:', this.contactForm.get('email')?.errors);
    console.log('Phone Errors:', this.contactForm.get('phone')?.errors);
    console.log('Message Errors:', this.contactForm.get('message')?.errors);

    if (this.contactForm.valid) {
      console.log('form submitted');
      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: (response: any) => {
          console.log('response:', response);
          this.toastService.showToast('Your message has been sent successfully!', 'success');
          this.errorMessage = '';
          this.contactForm.reset();
        },
        error: (error) => {
          this.toastService.showToast('An error occurred. Please try again later.', 'error');
          this.successMessage = '';
          console.error('Error:', error);
        }
      });
    } else {
      console.log('Form Validation Errors:', this.contactForm.errors);
      this.toastService.showToast('Please fill out all required fields correctly.', 'error');
      this.successMessage = '';
    }
  }

}
