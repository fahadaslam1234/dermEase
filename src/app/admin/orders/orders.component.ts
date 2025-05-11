import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/orderservice'; // Correct import
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['serialNumber', 'name', 'email', 'totalAmount', 'paymentStatus', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.dataSource.data = response.orders;
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  filterOrders(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  getSerialNumber(index: number): number {
    if (this.paginator) {
      return this.paginator.pageIndex * this.paginator.pageSize + index + 1;
    }
    return index + 1;
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.fetchOrders(); // Refresh after delete
          alert('Order deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting order:', err);
        }
      });
    }
  }

  viewOrder(order: any): void {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '600px',
      data: order
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
