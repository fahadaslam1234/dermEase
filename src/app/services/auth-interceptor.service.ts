import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

constructor(private router: Router) { }

intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
  req = req.clone({
    withCredentials : true
  });
  return next.handle(req).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.router.navigate(['']);
                }
            }));
}

}
