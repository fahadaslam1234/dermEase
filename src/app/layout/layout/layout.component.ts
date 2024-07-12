import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  ngOnInit(){
  }

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

  selectOptions(product: any) {
    // Handle select options
    console.log('Select Options:', product);
  }

  quickView(product: any) {
    // Handle quick view
    console.log('Quick View:', product);
  }

  addToCart(product: any) {
    // Handle add to cart
    console.log('Add to Cart:', product);
  }
}
