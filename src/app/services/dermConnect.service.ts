import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from './common.service';
import { Product } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class DermConnectService {

  constructor(private http: HttpClient,private service: CommonService) {}

  createAppointment(appointmentData: FormData): Observable<any> {
    return this.http.post<any>(`${this.service.API_URL}dermConnect/createAppointment`, appointmentData)
      .pipe(catchError(this.handleError));
  }

  getAllDerms(): Observable<any> {
    return this.http.get<any>(`${this.service.API_URL}dermConnect/getAllDermatologist`)
      .pipe(catchError(this.handleError));
  }

  getAllAppointments(username: String): Observable<any> {
    return this.http.get<any>(`${this.service.API_URL}dermConnect/getAppointments?doctor=${username}`)
      .pipe(catchError(this.handleError));
  }
  
  getAllApprovedAppointments(username: String): Observable<any> {
    return this.http.get<any>(`${this.service.API_URL}dermConnect/getApprovedAppointments?doctor=${username}`)
      .pipe(catchError(this.handleError));
  }

  updateAppointment(id:any,status:string):Observable<any>{
    console.log(id,status);
    return this.http.put<any>(`${this.service.API_URL}dermConnect/updateAppointment/status`,{id,status})
    .pipe(catchError(this.handleError));
}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError(() => new Error("You don't have permissions for this operation."));
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
