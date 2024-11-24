import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/productModel';
import { OverlayService } from '../../services/overlay.service';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  menuOpen = false;
  cartVisible = false;
  cartItems: any[] = [];
  user: any = null;  // User object to store the logged-in user
  isAdmin: boolean = false;  // To store whether the user is an admin or not
  isSearchBarVisible: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private overlayService: OverlayService,
    private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartCount = items.length;
    });

    // Get logged-in user details and check if the user is an admin
    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.isAdmin = this.user.role === 'admin';  // Assuming 'role' field in user object
    }
    console.log(this.user);
  }

  toggleSearch() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  toggleMenu() {
    const menu = document.getElementById('dropdownMenu') as HTMLElement;
    menu.classList.toggle('hidden');
  }

  openNav() {
    document.getElementById("mySidenav")!.style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuOpen = false;
  }

  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  addToCart(product : any){
    this.cartService.addToCart(product);
    this.cartVisible = true; // Show the cart sidebar when an item is added
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    if (this.cartItems.length === 0) {
      this.cartVisible = false; // Hide cart sidebar if no items are left
    }
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }

  subscribeToCartUpdates() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.cartVisible = items.length > 0; // Automatically show cart when items are added
    });
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  onViewCart() {
    this.router.navigate(['viewCart']);
  }

  onCart() {
    this.overlayService.openCart();
  }

  // Logout method
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login after logout
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  products = [
    {
      name: 'Bundle 5',
      image: '../../../assets/images/P1.png',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P2.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P3.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P4.png',
      price: 1900
    },
    {
      name: 'Bundle 5',
      image: '../../../assets/images/P5.png',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P6.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P7.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P8.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P9.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P10.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P11.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P12.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P13.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P14.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P15.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P16.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P17.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P18.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P19.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P20.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P21.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P22.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P23.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P24.png',
      price: 1900
    }
  ];
}
