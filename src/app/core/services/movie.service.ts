import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/core/models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public getList(): Observable<Array<IMovie>> {
    //do kerkoje nga get te marre arrayn e e movies
    return this.httpClient.get<Array<IMovie>>(`${environment.apiUrl}/movies`);
  }

  public getById(id: number): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${environment.apiUrl}/movies/${id}`); 
  }

  public create(request: IMovie): Observable<IMovie> {
    return this.httpClient.post<IMovie>(`${environment.apiUrl}/movies`, request); 
  }

  public update(request: IMovie): Observable<IMovie> {
    return this.httpClient.put<IMovie>(`${environment.apiUrl}/movies/${request.id}`, request);
  }

  public delete(id: number): Observable<IMovie> {
    return this.httpClient.delete<IMovie>(`${environment.apiUrl}/movies/${id}`);
  }

}
