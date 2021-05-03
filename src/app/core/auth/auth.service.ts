import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public login(request: { email: string, password: string }): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(environment.loginApiUrl, request);
  }

  public logout(): void {
    localStorage.removeItem(environment.loggedInUserLocalStorageKey);
    this.router.navigateByUrl('/login');
  }
}
