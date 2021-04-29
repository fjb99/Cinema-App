import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITheater } from 'src/app/core/models/theater';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  constructor(private httpClient: HttpClient) { }

  public getList(): Observable<Array<ITheater>> {
    return this.httpClient.get<Array<ITheater>>(`${environment.apiUrl}/theaters`);
  }

  public getById(id: number): Observable<ITheater> {
    return this.httpClient.get<ITheater>(`${environment.apiUrl}/theaters/${id}`);
  }

  public create(request: ITheater): Observable<ITheater> {
    return this.httpClient.post<ITheater>(`${environment.apiUrl}/theaters`, request);
  }

  public update(request: ITheater): Observable<ITheater> {
    return this.httpClient.put<ITheater>(`${environment.apiUrl}/theaters/${request.id}`, request);
  }

  public delete(id: string): Observable<ITheater> {
    return this.httpClient.delete<ITheater>(`${environment.apiUrl}/theaters/${id}`);
  }

}
