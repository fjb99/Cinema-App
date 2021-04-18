import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ITheatre } from 'src/app/core/models/theatre'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  constructor(private httpClient: HttpClient) { }

  public getList(): Observable<Array<ITheatre>> {
    return this.httpClient.get<Array<ITheatre>>(`${environment.apiUrl}/theaters`); 
  }

  public getById(id: number): Observable<ITheatre> {
    return this.httpClient.get<ITheatre>(`${environment.apiUrl}/theaters/${id}`);
  }

  public create(request: ITheatre): Observable<ITheatre> {
    return this.httpClient.post<ITheatre>(`${environment.apiUrl}/theaters`, request); 
  }

  public update(request: ITheatre): Observable<ITheatre> {
    return this.httpClient.put<ITheatre>(`${environment.apiUrl}/theaters`, request);
  }

  public delete(id: number): Observable<ITheatre> {
    return this.httpClient.delete<ITheatre>(`${environment.apiUrl}/theaters/${id}`); 
  }

}
