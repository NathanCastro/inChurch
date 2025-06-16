import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit{
  @Input() public title: string;
  @Input() public subtitle = "Deseja apagar ?";

  confirmDelete = new EventEmitter()
  
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }

  ngOnInit(){
    if (this.data) {
      const { title, subtitle } = this.data;
      this.title = title;
      this.subtitle = subtitle;
    }
  }

  public onConfirmDelete(){
    this.confirmDelete.emit();
    this.dialogRef.close();  
  }

  public onCancel(){
    this.dialogRef.close()
  }
}