import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  menuOpen = false;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartCount = items.length;
    });
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
  // onLogin() {
  //   const dialogRef = this.dialog.open(LoginSignupComponent, {
  //     width: '90%',
  //     maxWidth: '900px',
     
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
