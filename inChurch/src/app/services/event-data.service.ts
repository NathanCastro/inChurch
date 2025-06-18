import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvents } from '../interfaces/events.interface';
import { Events } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {
  public eventsUpdatedSubject = new Subject<void>();
  private readonly API = `${environment.apiUrl}eventos`
  
  constructor(
    private http: HttpClient
  ) { }

  public getAll(){
    return this.http.get<IEvents[]>(this.API)
  }

  public getById(id: string){
    return this.http.get(`${this.API}/${id}`).pipe(take(1))
  }

  public addEvent(event: Events): Observable<Events> {
    return this.http.post<Events>(this.API, event).pipe(
      tap(() => this.eventsUpdatedSubject.next()));
  }

  public updateEvent(event: Events): Observable<Events> {
    const url = `${this.API}/${event.id}`
    return this.http.put<Events>(url, event).pipe(
    tap(() => this.eventsUpdatedSubject.next()));
  }
  
  public deleteEvent(id: string): Observable<void>{
    const url = `${this.API}/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => this.eventsUpdatedSubject.next())
    )
  }
}