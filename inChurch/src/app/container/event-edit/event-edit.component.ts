import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { options } from 'src/app/constants/selector-options';
import { Events } from 'src/app/models/events';
import { EventDataService } from 'src/app/services/event-data.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit{
  
  imagePreview: string | null = null;
  imageBase64: string | ArrayBuffer | null = null;
  todayDate: string

  public form: FormGroup;
  public events: Events[] = [];
  public selectedValue: string;  
  public options = options;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Events,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private eventDataService: EventDataService,  
  ){
    console.log("✔️ ~ EventEditComponent ~ data:", data)}

  ngOnInit(): void {
    this.setForm();

  }

  public fieldIsValid(control: AbstractControl  | null): boolean{
    return !!control && control.invalid && control.touched
  }

  // public choseImg(event: Event): void {
  //   // const file = (event.target as HTMLInputElement).files?.[0];

  //   // if (file) {
  //   //   this.form.patchValue({ image: file });
  //   //   this.form.get('image')?.updateValueAndValidity();

  //   //   const reader = new FileReader();
  //   //   reader.onload = () => {
  //   //     this.imagePreview = reader.result;
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   // }
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.form.patchValue({ image: file });
  //     this.form.get("image")?.updateValueAndValidity();
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result as string;
  //       console.log("Imagem transformada em Base64:", this.imagePreview);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.form.get("image")?.setErrors({ required: true });
  //   }
  // }

  public save(){
    this.todayDate = new Date().toISOString();
    this.form.get('publishedDate')?.patchValue(this.todayDate);

    const dataEvent = this.form.value;
    if(this.form.valid && this.form.dirty){
      this.eventDataService.updateEvent(dataEvent).subscribe(() => {        
        this.snackBar.open('Evento Editado com sucesso','', {duration: 2000})}
      );
      this.dialog.closeAll();
    }    
  }

  
  public cancel(){
    this.dialog.closeAll()
  }

  
  private setForm(): void{
    this.form = this.fb.group({
      id:[''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      // image: ['', Validators.required],
      publishedDate: ['']
    });
    this.setValue();
  }

  private setValue(){
    this.form.get('id')?.setValue(this.data.id);
    this.form.get('title')?.setValue(this.data.title);
    this.form.get('description')?.setValue(this.data.description);
    this.form.get('status')?.setValue(this.data.status);
    // this.form.get('image')?.setValue(this.data.image);
    this.form.get('publishedDate')?.setValue(this.data.publishedDate);
  }
}
