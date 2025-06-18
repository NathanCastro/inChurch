import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new Subject<string>();
  public searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  public setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
}
