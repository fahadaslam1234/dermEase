import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;

  constructor(private router: Router) {}

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
}
