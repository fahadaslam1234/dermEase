import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private fb: FormBuilder, private contactService: ContactService, private toastService : ToastService,
    private spinner: NgxSpinnerService) {
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
    this.spinner.show();

    if (this.contactForm.valid) {
      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: (response: any) => {
          this.spinner.hide();
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
