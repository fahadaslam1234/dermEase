import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient, private service: CommonService) {}

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.service.API_URL}orders/placeOrder`, orderData);
  }

  createStripeSession(orderData: any): Observable<any> {
    return this.http.post(`${this.service.API_URL}orders/createStripeSession`, orderData);
  }
  updateOrderStatus(orderId: string, status: string) {
    return this.http.put(`${this.service.API_URL}/orders/${orderId}`, { paymentStatus: status });
  }

}
