import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { columnEvents } from 'src/app/constants/column-events';
import { Events } from 'src/app/models/events';

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
  
  constructor(){}

  ngOnInit(): void{

  }

  // ngAfterViewInit(){
  //   this.dataSource.paginator = this.paginator;
  // }

  public onEditEvent(elementEvents: Events){

  }

  openEventDetails(id: string){}

  confirmDeleteEvent(id: string){}

  onPageChange(event: PageEvent){
    console.log(event)
  }
}
