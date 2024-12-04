import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/productService';
import { CommonService } from 'src/app/services/common.service';
import { Product } from 'src/app/models/productModel';
import { EditProductDialogComponent } from '../EditProductDialogComponent/EditProductDialogComponent.component';


@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['product_name', 'product_description', 'product_image', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private commonService: CommonService, private dialog: MatDialog) {}

  imageUrl = this.commonService.imageUrl;


  ngOnInit() {
    this.fetchProducts();
    console.log(this.imageUrl);
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        var products = response.data;
        this.dataSource.data = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  filterTable(){
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

getFullImageUrl(imagePath: string): string {
  // Replace backslashes with forward slashes
  const normalizedPath = imagePath.replace(/\\/g, '/'); // Global replacement of '\'
  const fullImageUrl = `${normalizedPath}`;
  console.log("Full Image URL:", fullImageUrl); // Logs the corrected full URL
  return fullImageUrl;
}


  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.fetchProducts(); // Refresh list
          alert('Product deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  // Open Edit Dialog
  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: { product } // Pass the product data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchProducts(); // Refresh the list after update
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
