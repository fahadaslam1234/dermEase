import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/productService';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private productService: ProductService, private toastService: ToastService) { }

  ngOnInit() {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.selectedFile = file; // Store the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Show the image preview
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.selectedFile) {
      return; // Prevent submission if the form is invalid or no image is selected
    }

    // Create FormData to send to backend
    const productData = new FormData();
    productData.append('product_name', form.value.productName);
    productData.append('product_description', form.value.productDescription);
    productData.append('price', form.value.productPrice);
    productData.append('image', this.selectedFile, this.selectedFile.name);

    // Call the service to add the product
    this.productService.addProduct(productData).subscribe({
      next: (response) => {
        if (response.status) {
          this.toastService.showToast('Product added successfully!', 'success'); // Show success toast
          form.resetForm(); // Optionally reset the form after successful submission
          this.imagePreview = null; // Clear the image preview
        } else {
          this.toastService.showToast(response.message || 'Error adding product!', 'error'); // Show error toast from response
        }
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.toastService.showToast('Something went wrong. Please try again.', 'error'); // Show generic error toast
      }
    });
  }
}
