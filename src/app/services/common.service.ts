import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

constructor() { }

 public API_URL = "http://localhost:3000/";
 //public API_URL = "https://10.200.40.229:443/";
// public API_URL = "https://prism-uatbe.mobilinkbank.com/"; 

}
