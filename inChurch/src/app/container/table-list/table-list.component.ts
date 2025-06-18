import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
import { SearchService } from 'src/app/@shared/services/search.service';
import { columnEvents } from 'src/app/constants/column-events';
import { Events } from 'src/app/models/events';
import { EventDataService } from 'src/app/services/event-data.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventEditComponent } from '../event-edit/event-edit.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  dataSource = new MatTableDataSource<Events>();
  displayedColumns = columnEvents;  
  eventosFiltrados: any[] = [];
  
  public events$: Observable<Events[]>;
  private subscriptions = new Subscription();

  constructor(
    private dialog: MatDialog,
    private eventDataService: EventDataService,
    private snackBar: MatSnackBar,
    private searchService: SearchService,
  ){}
  
  ngOnInit(): void{
    this.getAllEvents();

    this.subscriptions.add(this.eventDataService.eventsUpdatedSubject.subscribe(() => {
      this.getAllEvents(); 
    }));

    this.paginator._intl.itemsPerPageLabel = "Itens por pág"
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onEditEvent(elementEvents: Events): void{
    this.subscriptions.add(this.eventDataService.getById(elementEvents.id).subscribe( res =>{
      if(res){
        this.dialog.open(EventEditComponent, {
          ...ModalConfig.MEDIUM,
          data: elementEvents
        })

      }
    }))
  }

  public openEventDetails(id: string):void{
    this.subscriptions.add(this.eventDataService.getById(id).subscribe(item => {
      if(item) {
        this.dialog.open(EventDetailComponent,{
          ...ModalConfig.MEDIUM,
          data: item,
        })
      }
    }))
  }

  public confirmDeleteEvent(id:string): void{
    const modal = this.dialog.open(ModalDeleteComponent, {      
      data:{ 
        title: "Deletar",
        subtitle: `Deseja apagar?`
      }
    });
    
    this.subscriptions.add(modal.componentInstance.confirmDelete.subscribe(()=> {
      this.eventDataService.deleteEvent(id).subscribe(() =>{
        this.snackBar.open('Evento apagado com sucesso', '', {duration:2000})

      });
    }))
  }

  private getAllEvents(): void{
    this.subscriptions.add(this.eventDataService.getAll().subscribe(item => {
      this.eventosFiltrados = this.dataSource.data = item;
      this.dataSource.paginator = this.paginator;
      this.listenToSearchTerm();
      })
    );
  }

  private listenToSearchTerm(): void {
    this.subscriptions.add(this.searchService.searchTerm$.subscribe(term => {
      const filtered = this.eventosFiltrados.filter(event =>
        event.title?.toLowerCase().includes(term.toLowerCase()) ||
        event.description?.toLowerCase().includes(term.toLowerCase()));

        this.dataSource = new MatTableDataSource(filtered);
        this.dataSource.paginator = this.paginator;
      })
    );
  }

}
