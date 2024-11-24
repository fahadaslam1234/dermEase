import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service'; // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

    constructor(private http: HttpClient, private service: CommonService) {

    }

    getRecommendation(data: any): Observable<any> {
      return this.http.post<any>(this.service.API_URL + '/recommendation', data);
    }
}
