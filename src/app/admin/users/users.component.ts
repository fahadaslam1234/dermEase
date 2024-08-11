import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface User {
  id: number;
  name: string;
  email: string;
}

const USER_DATA: User[] = [
  {id: 1, name: 'John Doe', email: 'john.doe@example.com'},
  {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'},
  // Add more users here
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>(USER_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(user: User) {
    // Implement edit user functionality
  }

  deleteUser(user: User) {
    // Implement delete user functionality
  }

}
