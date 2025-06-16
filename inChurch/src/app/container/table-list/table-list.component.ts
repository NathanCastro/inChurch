import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
import { columnEvents } from 'src/app/constants/column-events';
import { Events } from 'src/app/models/events';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventEditComponent } from '../event-edit/event-edit.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public events: Events[] = [];

  dataSource = new MatTableDataSource<Events>();
  displayedColumns = columnEvents;  
  
  constructor(
    private dialog: MatDialog
  ){}

  ngOnInit(): void{
    
  }

  // ngAfterViewInit(){
  //   this.dataSource.paginator = this.paginator;
  // }

  public onEditEvent(elementEvents: Events){
    this.dialog.open(EventEditComponent, ModalConfig.MEDIUM)
  }

  public openEventDetails(id: string){
    this.dialog.open(EventDetailComponent, ModalConfig.MEDIUM)
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

  onPageChange(event: PageEvent){
    console.log(event)
  }
}
