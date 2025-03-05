import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SkinDiseaseService {

  constructor(private http: HttpClient, private service: CommonService) {}

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.service.API_URL}diseasePredictor/upload`, formData)
      .pipe(catchError(this.handleError));
  }

  getAllPredictions(username: String): Observable<any> {
    return this.http.get<any>(`${this.service.API_URL}diseasePredictor/getAllPredictions?userId=${username}`)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError(() => new Error("You don't have permissions for this operation."));
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
