import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(request: { email: string, password: string }): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(environment.loginApiUrl, request);
  }
}
