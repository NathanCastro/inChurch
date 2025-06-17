import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { options } from 'src/app/constants/selector-options';
import { EventEditComponent } from '../event-edit/event-edit.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  imageUrl: string | ArrayBuffer | null = null;
  public form: FormGroup;
  public options = options;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog   
  ){ }

  ngOnInit(): void{
    this.setForm();
  }

  public openEventEdit(): void{
    this.dialog.open(EventEditComponent, {
      ...ModalConfig.MEDIUM,
      data: this.data 
    });
  }

  public cancel(): void{
    this.dialog.closeAll()
  }


  private setForm(): void{
    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [null, Validators.required],
      image: [null, Validators.required],
      publishedDate: [null]
    });
    this.form.disable();
    this.setValue();
  }

  private setValue(): void{
    this.form.get('id')?.setValue(this.data.id);
    this.form.get('title')?.setValue(this.data.title);
    this.form.get('description')?.setValue(this.data.description);
    this.form.get('status')?.setValue(this.data.status);
    this.form.get('image')?.setValue(this.data.image);
    this.form.get('publishedDate')?.setValue(this.data.publishedDate);
    this.imageUrl = this.data.image;
  }
}
