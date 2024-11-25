import { OnInit, ViewContainerRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Component,ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DynamicComponentLoaderService } from '../../services/dynamic-component-loader.service';
import { NavModule } from '../../models/nav-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { AddProductComponent } from '../addProduct/addProduct.component';
import { ProductListComponent } from '../productList/productList.component';
import { ApprovalsComponent } from '../Approvals/Approvals.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminLayout',
  templateUrl: './adminLayout.component.html',
  styleUrls: ['./adminLayout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef })
  componentContainer!: ViewContainerRef;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  active = '';
  permissions = ['update', 'report', 'approve'];
  navItems: NavModule[] = [];
  isNavbarOpen = true;
  activeModuleName: string = '';
  icon!: string;
  user: any = null;
  isAdmin: boolean = false;
  isVendor: boolean = false;


  constructor(private observer: BreakpointObserver, private router: Router,
    private dynamicComponentService: DynamicComponentLoaderService,
    private route: ActivatedRoute, private authService : AuthService) {}

  ngAfterViewInit(): void {
    this.initializeModules();
    this.dynamicComponentService.component$.subscribe((comp)=>{
      this.dynamicComponentService.loadComponent(comp, this.componentContainer);
    });
    this.route.queryParams.subscribe(params => {
      const componentName = params['component'];
      if (componentName) {
        this.loadComponentByName(componentName);
      } else {
        this.loadComponent(this.navItems[0].tiles[0]); // Load default component
      }
    });
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.isAdmin = this.user.role === 'admin';  // Assuming 'role' field in user object
      this.isVendor = this.user.role === 'vendor';  // Assuming 'role' field in user object
    }
    console.log(this.user);
  }
  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  loadComponent(navItem: any) {
    this.active = navItem.title;
    this.icon = navItem.icon;
    this.activeModuleName = navItem.modulename;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { component: navItem.title },
      queryParamsHandling: 'merge',
    });

    this.dynamicComponentService.loadComponent(navItem.component, this.componentContainer);
  }

  loadComponentByName(componentName: string) {
    for (const module of this.navItems) {
      for (const tile of module.tiles) {
        if (tile.title === componentName) {
          this.loadComponent(tile);
          return;
        }
      }
    }
  }

  initializeModules() {

    //USER
    var user = new NavModule();
    user.name = 'Users';
    user.tiles = [];
    user.icon = 'person';
    user.tiles.push({
      title: 'View Users',
      icon: 'list',
      component: UsersComponent,
      permission: '',
      modulename: user.name,
      roles: ['admin']
    });
    user.tiles = user.tiles.filter(tile => this.hasRole(tile.roles)); // Filter tiles by role
    if (user.tiles.length > 0) this.navItems.push(user);

        //Approval User
        var Approvals = new NavModule();
        Approvals.name = 'Approvals';
        Approvals.tiles = [];
        Approvals.icon = 'person';
        Approvals.tiles.push({
          title: 'Approvals',
          icon: 'list',
          component: ApprovalsComponent,
          permission: '',
          modulename: Approvals.name,
          roles: ['admin']
        });
        Approvals.tiles = Approvals.tiles.filter(tile => this.hasRole(tile.roles)); // Filter tiles by role
        if (Approvals.tiles.length > 0) this.navItems.push(Approvals);

    // GROUP
    var group = new NavModule();
    group.name = 'Products';
    group.tiles = [];
    group.icon = 'supervisor_account';
    group.tiles.push({
      title: 'Add Products',
      icon: 'add_circle',
      component: AddProductComponent,
      permission: '',
      modulename: group.name,
      roles: ['admin','vendor']
    });
    group.tiles.push({
      title: 'All Products',
      icon: 'group_add',
      component: ProductListComponent,
      permission: '',
      modulename: group.name,
      roles: ['admin','vendor']
    });
    group.tiles = group.tiles.filter(tile => this.hasRole(tile.roles)); // Filter tiles by role
    if (group.tiles.length > 0) this.navItems.push(group);
   }

   hasRole(allowedRoles: string[]): boolean {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // If no roles are specified, allow access to everyone
    }
    return allowedRoles.includes(this.user.role); // Check if user's role is allowed
  }

   onHome(){
    this.router.navigate(['/']);
   }
}
