import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['user_name', 'email','role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit() {
    this.fetchUsers(); // Fetch the users when component initializes
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        const users = response.data; // Extract the users from the 'data' array
        this.dataSource.data = users; // Set the dataSource with the users from backend
        this.toastService.showToast('Users fetched successfully!', 'success'); // Success notification
      },
      error: () => {
        this.toastService.showToast('Failed to fetch users', 'error'); // Error notification
      }
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user: ${user.user_name}?`)) {
      this.userService.deleteUser(user._id).subscribe({
        next: () => {
          this.fetchUsers(); // Refresh the list after deletion
          this.toastService.showToast('User deleted successfully!', 'success'); // Success notification
        },
        error: () => {
          this.toastService.showToast('Failed to delete user', 'error'); // Error notification
        }
      });
    }
  }
}
