import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = (localStorage.getItem(environment.loggedInUserLocalStorageKey) && JSON.parse(localStorage.getItem(environment.loggedInUserLocalStorageKey) as string))?.token;
    if (token) {
      const modifiedRequest: HttpRequest<any> = req.clone({
        headers: new HttpHeaders({ Authorization: token })
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}
