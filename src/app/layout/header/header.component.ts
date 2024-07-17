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
  ngOnInit(){

  }

  toggleMenu(): void {
    const menu = document.getElementById("dropdownMenu");
    if (menu) {
      if (menu.style.display === "block") {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
      }
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.menuOpen = false;
  }

}
