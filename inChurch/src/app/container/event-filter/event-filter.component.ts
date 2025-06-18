import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
import { SearchService } from 'src/app/@shared/services/search.service';
import { ViewService } from 'src/app/@shared/services/view.service';
import { EventCreateComponent } from '../event-create/event-create.component';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit, OnDestroy{
  
  public currentView: 'cards' | 'list' = 'cards';
  public searchTerm$ = new Subject<string>();  
  
  private subscription: Subscription;
  
  constructor(
    private viewService: ViewService,
    private dialog: MatDialog,    
    private searchService: SearchService,
  ){}

  ngOnInit(): void{
    this.subscription = this.viewService.viewMode$.subscribe((view) => {
      this.currentView = view;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  public onInputSearch(event: any): void {
    this.searchService.setSearchTerm(event.target.value);
  }

    
  public  changeView(view: 'cards' | 'list') {
    const nextView = this.currentView === 'cards' ? 'list' : 'cards';
    this.viewService.setViewMode(nextView);
  }

  public insertEvent(): void{
    this.dialog.open(EventCreateComponent, ModalConfig.MEDIUM)
  }

  public confirmDeleteEvent(id:string): void{
    const modal = this.dialog.open(ModalDeleteComponent, {
      disableClose: false,
      data:{ 
        title: "Deletar",
        subtitle: `Deseja apagar?`
      }
    });    
  }
}
