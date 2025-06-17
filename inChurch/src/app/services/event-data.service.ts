import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, take } from 'rxjs';
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
    this.http.post(this.API, event).pipe(take(1));
    this.eventsUpdatedSubject.next();
    return of(event)
  }

  public updateEvent(event: Events): Observable<Events>{ 
       
    this.eventsUpdatedSubject.next();
    return this.http.put<Events>(this.API, event).pipe(take(1));
  }
  
  public deleteEvent(){}
}
