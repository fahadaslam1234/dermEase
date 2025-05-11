import { OnInit, ViewContainerRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DynamicComponentLoaderService } from '../../services/dynamic-component-loader.service';
import { NavModule } from '../../models/nav-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { AddProductComponent } from '../addProduct/addProduct.component';
import { ProductListComponent } from '../productList/productList.component';
import { OrdersComponent } from '../orders/orders.component'; // ✅ Added Orders
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

  isMobile = true;
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

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private dynamicComponentService: DynamicComponentLoaderService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.initializeModules();
    this.dynamicComponentService.component$.subscribe((comp) => {
      this.dynamicComponentService.loadComponent(comp, this.componentContainer);
    });
    this.route.queryParams.subscribe(params => {
      const componentName = params['component'];
      if (componentName) {
        this.loadComponentByName(componentName);
      } else {
        this.loadComponent(this.navItems[0].tiles[0]); // Default load
      }
    });
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });

    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.isAdmin = this.user.role === 'admin';
      this.isVendor = this.user.role === 'vendor';
    }
    console.log(this.user);
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
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
    // USERS
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
    user.tiles = user.tiles.filter(tile => this.hasRole(tile.roles));
    if (user.tiles.length > 0) this.navItems.push(user);

    // APPROVALS
    var approvals = new NavModule();
    approvals.name = 'Approvals';
    approvals.tiles = [];
    approvals.icon = 'done_all';
    approvals.tiles.push({
      title: 'Approvals',
      icon: 'done_all',
      component: ApprovalsComponent,
      permission: '',
      modulename: approvals.name,
      roles: ['admin']
    });
    approvals.tiles = approvals.tiles.filter(tile => this.hasRole(tile.roles));
    if (approvals.tiles.length > 0) this.navItems.push(approvals);

    // PRODUCTS
    var group = new NavModule();
    group.name = 'Products';
    group.tiles = [];
    group.icon = 'inventory';
    group.tiles.push({
      title: 'Add Products',
      icon: 'add_circle_outline',
      component: AddProductComponent,
      permission: '',
      modulename: group.name,
      roles: ['admin', 'vendor']
    });
    group.tiles.push({
      title: 'All Products',
      icon: 'view_list',
      component: ProductListComponent,
      permission: '',
      modulename: group.name,
      roles: ['admin', 'vendor']
    });
    group.tiles = group.tiles.filter(tile => this.hasRole(tile.roles));
    if (group.tiles.length > 0) this.navItems.push(group);

    // ORDERS (✅ New)
    var orders = new NavModule();
    orders.name = 'Orders';
    orders.tiles = [];
    orders.icon = 'shopping_cart';
    orders.tiles.push({
      title: 'All Orders',
      icon: 'shopping_cart',
      component: OrdersComponent,
      permission: '',
      modulename: orders.name,
      roles: ['admin', 'vendor']
    });
    orders.tiles = orders.tiles.filter(tile => this.hasRole(tile.roles));
    if (orders.tiles.length > 0) this.navItems.push(orders);
  }

  hasRole(allowedRoles: string[]): boolean {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    return allowedRoles.includes(this.user.role);
  }

  onHome() {
    this.router.navigate(['/']);
  }
}
