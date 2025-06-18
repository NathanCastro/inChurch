import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
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
export class EventFilterComponent {
  public currentView: 'cards' | 'list' = 'cards';
  public searchTerm$ = new Subject<string>();  
  
  
  constructor(
    private viewService: ViewService,
    private dialog: MatDialog,    
    private searchService: SearchService,
  ){}

  ngOnInit(){
    this.viewService.viewMode$.subscribe((view) => {
      this.currentView = view;
    });
  }

  public onInputSearch(event: any): void {
    this.searchService.setSearchTerm(event.target.value);
  }

    
  public  changeView(view: 'cards' | 'list') {
    const nextView = this.currentView === 'cards' ? 'list' : 'cards';
    this.viewService.setViewMode(nextView);
  }

  public insertEvent(){
    this.dialog.open(EventCreateComponent, ModalConfig.MEDIUM)
  }

  public confirmDeleteEvent(id:string){
    const modal = this.dialog.open(ModalDeleteComponent, {
      disableClose: false,
      data:{ 
        title: "Deletar",
        subtitle: `Deseja apagar?`
      }
    });    
  }
}
