import { Component, OnInit } from '@angular/core';
import { QuickViewProductComponent } from '../../layout/quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-allProducts',
  templateUrl: './allProducts.component.html',
  styleUrls: ['./allProducts.component.css']
})
export class AllProductsComponent implements OnInit {
  products = [
    {
      name: 'Bundle 5',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 1900
    },
    {
      name: 'Bundle 5',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 1900
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  
  selectOptions(product: any) {
    // Handle select options
    console.log('Select Options:', product);
  }

  quickView(product: any) {
    const dialogRef = this.dialog.open(QuickViewProductComponent, {
      width: '80%',
      maxWidth: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addToCart(product: any) {
    // Handle add to cart
    console.log('Add to Cart:', product);
  }

}
