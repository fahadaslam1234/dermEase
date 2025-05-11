import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/userModel'; // Import the User model
import { UserService } from 'src/app/services/users.service';
import { ToastService } from 'src/app/services/toastService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['serialNumber', 'user_name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getSerialNumber(index: number): number {
    if (this.paginator) {
      return this.paginator.pageIndex * this.paginator.pageSize + index + 1;
    }
    return index + 1;
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        const users = response.data;
        this.dataSource.data = users;
        this.toastService.showToast('Users fetched successfully!', 'success');
      },
      error: () => {
        this.toastService.showToast('Failed to fetch users', 'error');
      }
    });
  }

  filterTable() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user: ${user.user_name}?`)) {
      this.userService.deleteUser(user._id).subscribe({
        next: () => {
          this.fetchUsers();
          this.toastService.showToast('User deleted successfully!', 'success');
        },
        error: () => {
          this.toastService.showToast('Failed to delete user', 'error');
        }
      });
    }
  }
}
