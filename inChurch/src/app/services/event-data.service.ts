import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEvents } from '../interfaces/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private readonly API = `${environment.apiUrl}eventos`

  constructor(
    private http: HttpClient
  ) { }

  public list(){
    return this.http.get<IEvents[]>(this.API)
  }
}
