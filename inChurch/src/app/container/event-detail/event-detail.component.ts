import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { EventEditComponent } from '../event-edit/event-edit.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {

  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog   
  ){}

  ngOnInit(){
    this.setForm();
  }

  public openEventDetails(){
    this.dialog.open(EventEditComponent, ModalConfig.MEDIUM)
  }

  public cancel(){
    this.dialog.closeAll()
  }


  private setForm(){
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      image: [null, Validators.required],
      publishedDate: [null]
    });
    this.form.disable();
    this.setValue();
  }

  private setValue(){
    this.form.get('id')?.setValue(this.data.id);
    this.form.get('title')?.setValue(this.data.name);
    this.form.get('description')?.setValue(this.data.description);
    this.form.get('status')?.setValue(this.data.status);
    this.form.get('image')?.setValue(this.data.image);
    this.form.get('publishedDate')?.setValue(this.data.publishedDate);
  }
}
