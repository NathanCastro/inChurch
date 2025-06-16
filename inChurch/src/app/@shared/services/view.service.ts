import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private viewModeSubject = new BehaviorSubject<'cards' | 'list'>('cards');
  viewMode$ = this.viewModeSubject.asObservable();

  setViewMode(view: 'cards' | 'list') {
    this.viewModeSubject.next(view);
  }
}
