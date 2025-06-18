import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
import { SearchService } from 'src/app/@shared/services/search.service';
import { Events } from 'src/app/models/events';
import { EventDataService } from 'src/app/services/event-data.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventEditComponent } from '../event-edit/event-edit.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;  
 
  pageSize: number = 10;
  pageIndex: number = 0;
  currentPage: number = 0;  
  filterEvents: Events[] = [];

  public events: Events[] = [];
  public paginatedEvents: Events[] = [];
 
  constructor(
    private dialog: MatDialog,
    private eventDataService: EventDataService,
    private snackBar: MatSnackBar,
    private searchService: SearchService,
  ){}

  ngOnInit(): void{
    this.getAllEvents();

    this.eventDataService.eventsUpdatedSubject.subscribe(() => {
      this.getAllEvents(); 
    });

    this.paginator._intl.itemsPerPageLabel = "Itens por pág";
  }

  public onEditEvent(elementEvents: Events): void{
    this.eventDataService.getById(elementEvents.id).subscribe( res =>{
      if(res){
        this.dialog.open(EventEditComponent, {
          ...ModalConfig.MEDIUM,
          data: elementEvents
        })

      }
    })
  }

  public openEventDetails(id: string): void{
    this.eventDataService.getById(id).subscribe(item => {
      if(item) {
        this.dialog.open(EventDetailComponent,{
          ...ModalConfig.MEDIUM,
          data: item,
        })
      }
    })
  }

  public confirmDeleteEvent(id:string): void{
    const modal = this.dialog.open(ModalDeleteComponent, {      
      data:{ 
        title: "Deletar",
        subtitle: `Deseja apagar?`
      }
    });
    
    modal.componentInstance.confirmDelete.subscribe(()=> {
      this.eventDataService.deleteEvent(id).subscribe(() =>{
        this.snackBar.open('Evento apagado com sucesso', '', {duration:2000})
      });
    })
  }

  public onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedEvents();
  }

  private getAllEvents(): void {
    this.eventDataService.getAll().subscribe(items => {
      this.filterEvents = this.events = items;
      this.currentPage = 0;
      this.updatePaginatedEvents();
      this.listenToSearchTerm();
    });
  }

  private listenToSearchTerm(): void {
    this.searchService.searchTerm$.subscribe(term => {
      this.filterEvents = this.events.filter(event =>
      event.title?.toLowerCase().includes(term.toLowerCase()) ||
      event.description?.toLowerCase().includes(term.toLowerCase()));
      
      this.currentPage = 0; 
      this.updatePaginatedEvents();
    });
  }

  private updatePaginatedEvents(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEvents = this.filterEvents.slice(start, end);
  }
}
