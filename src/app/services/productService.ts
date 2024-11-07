import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from './common.service';
import { Product } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,private service: CommonService) {}

  addProduct(productData: FormData): Observable<any> {
    const options = { headers: new HttpHeaders({ /* No content-type header for multipart/form-data */ }) };

    return this.http.post<any>(`${this.service.API_URL}product/create`, productData, options)
      .pipe(catchError(this.handleError));
  }


  // Get all products from the backend
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.service.API_URL}product/getAllProducts`).pipe(
      catchError(this.handleError)
    );
  }


  // Delete a product by ID
  deleteProduct(product_id: string): Observable<any> {
    const body = { product_id }; // Send the product ID in the request body
    return this.http.post<any>(`${this.service.API_URL}product/delete`, body).pipe(
      catchError(this.handleError)
    );
  }

  // Update a product by ID
updateProduct(product_id: string, updatedProductData: FormData): Observable<any> {
  updatedProductData.append('product_id', product_id);
  return this.http.post<any>(`${this.service.API_URL}product/update`, updatedProductData).pipe(
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
