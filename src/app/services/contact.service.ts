import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private service: CommonService) { }

  sendContactForm(data: any): Observable<any> {
    return this.http.post<any>(this.service.API_URL + 'contactUs', data);
  }
}
