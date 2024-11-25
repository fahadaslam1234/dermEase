import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, map } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private service: CommonService) { }

  // Public login method
  public login<ApiResponse>(username: string, password: string): Observable<ApiResponse> {
    const body = { 'user_name': username, 'password': password };
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post<ApiResponse>(`${this.service.API_URL}authentication/login`, body, options)
      .pipe(
        map((response: any) => {
          // Save user info and token in session storage after successful login
          if (response.status) {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            sessionStorage.setItem('token', response.data.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

    // Public signup method
    public signup<ApiResponse>(user_name: string, email: string, password: string, is_dermatologist: boolean, is_vendor : boolean, file?: File): Observable<ApiResponse> {
      const formData: FormData = new FormData();
      formData.append('user_name', user_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('is_dermatologist', is_dermatologist.toString());
      formData.append('is_vendor', is_vendor.toString());

      console.log(user_name, email, password,is_dermatologist);

      if (is_dermatologist && file) {
        formData.append('certification', file, file.name);
      }
      console.log(formData);
      const options = { headers: new HttpHeaders({ /* No content-type header for multipart/form-data */ }) };
      return this.http.post<ApiResponse>(`${this.service.API_URL}authentication/register`, formData, options)
        .pipe(catchError(this.handleError));
    }


  // Public method to logout the user
  public logout(): void {
    // Clear session storage on logout
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  // Public method to check if the user is logged in
  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');  // Return true if user is logged in
  }

  // Public method to get the logged-in user's details
  public getLoggedInUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;  // Return the parsed user details
  }

  // Public method to get the authentication token
  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError(() => new Error("You don't have permissions for this operation."));
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
