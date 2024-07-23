import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public API_URL = "http://localhost:3001/api";

  constructor() { }
}
