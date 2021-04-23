import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISchedule } from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }

  public getlist(): Observable<Array<ISchedule>> {
    return this.httpClient.get<Array<ISchedule>>(`${environment.apiUrl}/schedules`);
  }

  public getById(id: number): Observable<ISchedule> {
    return this.httpClient.get<ISchedule>(`${environment.apiUrl}/schedules/${id}`);
  }

  public create(request: ISchedule): Observable<ISchedule> {
    return this.httpClient.post<ISchedule>(`${environment.apiUrl}/schedules`, request); 
  }

  public update(request: ISchedule): Observable<ISchedule> {
    return this.httpClient.put<ISchedule>(`${environment.apiUrl}/schedules/${request.id}`, request); 
  }

  public delete(id: ISchedule): Observable<ISchedule> {
    return this.httpClient.delete<ISchedule>(`${environment.apiUrl}/schedules/${id}`); 
  }

}
