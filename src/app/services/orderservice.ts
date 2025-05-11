import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private service: CommonService) {}

  // ✅ Get all orders
  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.service.API_URL}orders`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get a single order by ID
  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.service.API_URL}orders/${orderId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Delete an order by ID
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.service.API_URL}orders/${orderId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Update order payment status (optional if you need to update Paid/Pending)
  updateOrderStatus(orderId: string, paymentStatus: string): Observable<any> {
    return this.http.put<any>(`${this.service.API_URL}orders/${orderId}`, { paymentStatus })
      .pipe(catchError(this.handleError));
  }

  // ✅ Centralized Error Handler
  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError(() => new Error("You don't have permission to perform this operation."));
    } else if (error.status === 404) {
      return throwError(() => new Error("Requested resource not found."));
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
