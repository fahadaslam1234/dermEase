import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // public API_URL = "http://192.168.0.102:3001/api/v1/";
  public imageUrl = "http://localhost:3001/"
  public API_URL = "http://localhost:3001/api/v1/";
  constructor() { }
}
