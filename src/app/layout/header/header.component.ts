import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupComponent } from '../loginSignup/loginSignup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

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
