import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
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
 
 pageSize = 10;
 pageIndex = 0; 
 itemsPerPageLabel = 'Items por paginas' 
 
 public events: Events[] = [];
 public paginatedEvents: Events[] = [];
 
  constructor(
    private dialog: MatDialog,
    private eventDataService: EventDataService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void{
    this.getAllEvents();

    this.eventDataService.eventsUpdatedSubject.subscribe(() => {
      this.getAllEvents(); 
    });

    this.paginator._intl.itemsPerPageLabel = "Itens por pág"
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
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedEvents();
  }

  private getAllEvents(): void {
    this.eventDataService.getAll().subscribe(items => {
      this.events = items;
      this.updatePaginatedEvents();
    });
  }

  private updatePaginatedEvents(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }
}
