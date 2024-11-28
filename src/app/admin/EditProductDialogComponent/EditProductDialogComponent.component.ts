import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/productService';
import { Product } from 'src/app/models/productModel';

@Component({
  selector: 'app-EditProductDialogComponent',
  templateUrl: './EditProductDialogComponent.component.html',
  styleUrls: ['./EditProductDialogComponent.component.css']
})
export class EditProductDialogComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  editForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },  // Inject the product data
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    // Initialize the form with product details
    this.editForm = this.formBuilder.group({
      product_name: [data.product.product_name, Validators.required],
      product_description: [data.product.product_description, Validators.required],
      price: [data.product.price, Validators.required]
    });
  }

  ngOnInit() {
  }

  // File selection handler
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Method to save the updated product
  save() {
    if (this.editForm.invalid) {
      return;
    }

    const updatedProductData = new FormData();
    updatedProductData.append('product_name', this.editForm.value.product_name);
    updatedProductData.append('product_description', this.editForm.value.product_description);
    updatedProductData.append('price', this.editForm.value.price);

    if (this.selectedFile) {
      updatedProductData.append('product_image', this.selectedFile, this.selectedFile.name);
    }

    // Call the update service
    this.productService.updateProduct(this.data.product._id, updatedProductData).subscribe({
      next: (response) => {
        this.dialogRef.close(true); // Close dialog and refresh the list
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
