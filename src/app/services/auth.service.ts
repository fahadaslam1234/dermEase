import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private service: CommonService) { }

  AuthenticateUser<ApiResponse>(userName: string, password: string) {
    const body = { 'username': userName, 'password': password };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<ApiResponse>(this.service.API_URL + 'auth/login', body, options)
  }

  public saveUserName(userName: string) {
    sessionStorage.setItem('userName', userName);
  }


  public async signOut() {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return  await this.http.post(this.service.API_URL + 'auth/logout', options);
  // return  this.http.post(this.service.API_URL + 'auth/logout', options);

      
  }

  // public isSignedIn(){
  // // var response!:any;
  // // this.http.get(this.service.API_URL + 'auth/IsSignedIn').subscribe({
  // //   next:(res:any)=>{
  // //     response=res.status
  // //   }
  // // })
  // //   return  response;
  // return this.http.get(this.service.API_URL + 'auth/IsSignedIn')
  // }
  isSignedIn(): Observable<boolean> {
    return this.http.get(this.service.API_URL + 'auth/IsSignedIn').pipe(
      map((response: any) => {
        if (response.status == true) {
          return true;
        }
        return false;
      })
    );
  }

  VerifyOTP<UserInfo>(userName: string, otp: string){
    const body = {'username': userName, 'password': otp};
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<UserInfo>(this.service.API_URL + 'auth/verifyOtp', body, options).pipe(catchError(this.handleError));
  }
  
  ResendOTP(userName: string){
   const body = {'username': userName};
   let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post<boolean>(this.service.API_URL + 'auth/resendOtp', body, options).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
      
    if(error.status==403)
    {
        return throwError(()=>new Error("You don't have permissions for this operation."))
    }
    return throwError(() => new Error('Something went wrong. Please try again.'));
}
}
