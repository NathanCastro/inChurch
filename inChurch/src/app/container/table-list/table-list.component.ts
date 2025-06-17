import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
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
export class TableListComponent implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public events$: Observable<Events[]>;

  dataSource = new MatTableDataSource<Events>();
  displayedColumns = columnEvents;  
  
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


  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
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

  public openEventDetails(id: string):void{
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

  private getAllEvents(): void{
    this.eventDataService.getAll().subscribe(item => {
      this.dataSource.data = item;
      this.dataSource.paginator = this.paginator;
    });
  }

}
