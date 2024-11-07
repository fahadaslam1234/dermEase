import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from './common.service';
import { User } from '../models/userModel'; // Import the User model

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private commonService: CommonService) {}

  // Get all users from the backend
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.commonService.API_URL}authentication/getAllUsers`).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a user by ID
  deleteUser(user_id: string): Observable<any> {
    const body = { user_id }; // Send the user ID in the request body
    return this.http.post<any>(`${this.commonService.API_URL}authentication/delete`, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError(() => new Error("You don't have permissions for this operation."));
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
