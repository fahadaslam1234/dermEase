import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/productModel';
import { OverlayService } from '../../services/overlay.service';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service'; // Import SearchService

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
  user: any = null; // User object to store the logged-in user
  isAdmin: boolean = false; // To store whether the user is an admin or not
  isVendor: boolean = false; // To store whether the user is an admin or not
  isSearchBarVisible: boolean = false;
  searchQuery: string = ''; // Search query property

  constructor(
    private router: Router,
    private cartService: CartService,
    private overlayService: OverlayService,
    private authService: AuthService,
    private searchService: SearchService // Inject SearchService
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartCount = items.length;
    });

    // Get logged-in user details and check if the user is an admin
    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.isAdmin = this.user.role === 'admin'; // Assuming 'role' field in user object
      this.isVendor = this.user.role === 'vendor'; // Assuming 'role' field in user object
    }
    console.log(this.user);
  }

  toggleSearch() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery); // Update the search query in the service
  }

    // Update the search query as the user types
    onInputChange(): void {
      this.searchService.updateSearchQuery(this.searchQuery); // Real-time search
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

  addToCart(product: any) {
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
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
