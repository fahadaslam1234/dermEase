import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SkinDiseaseService {

  constructor(private service : CommonService,private http: HttpClient) { }

  predictDisease(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>(this.service.API_URL + '/predict', formData);
  }
}
