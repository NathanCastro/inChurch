import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventEditComponent } from '../event-edit/event-edit.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{

   
        
  constructor(
    private dialog: MatDialog
     
  ){}

  ngOnInit(): void{
  }

  public onEditEvent(){
    this.dialog.open(EventEditComponent, ModalConfig.MEDIUM)
  }

  public openEventDetails(){
    this.dialog.open(EventDetailComponent, ModalConfig.MEDIUM)
   
  }

  public confirmDeleteEvent(){
    const modal = this.dialog.open(ModalDeleteComponent, {
      disableClose: false,
      data:{ 
        title: "Deleta22222222222r",
        subtitle: `Deseja apagar?`
      }
    });    
  }
}
