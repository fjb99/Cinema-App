import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/core/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  public getList(): Observable<Array<ICategory>> {
    return this.httpClient.get<Array<ICategory>>(`${environment.apiUrl}/categories`);
  }

  public getById(id: string): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${environment.apiUrl}/categories/${id}`);
  }

  public create(request: ICategory): Observable<ICategory> {
    return this.httpClient.post<ICategory>(`${environment.apiUrl}/categories`, request);
  }

  public update(request: ICategory): Observable<ICategory> {
    return this.httpClient.put<ICategory>(`${environment.apiUrl}/categories/${request.id}`, request);
  }

  public delete(id: string): Observable<ICategory> {
    return this.httpClient.delete<ICategory>(`${environment.apiUrl}/categories/${id}`);
  }
}
