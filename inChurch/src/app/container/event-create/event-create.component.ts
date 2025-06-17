import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Events } from 'src/app/models/events';
import { EventDataService } from 'src/app/services/event-data.service';
import { options } from './../../constants/selector-options';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit{
  imagePreview: string | null = null;
  imageBase64: string | ArrayBuffer | null = null;
  
  todayDate: string

  public form: FormGroup;
  public events: Events[] = [];
  public selectedValue: string;  
  public options = options;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private eventDataService: EventDataService,
    private snackBar: MatSnackBar
  ){}

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

    if(this.form.valid){
      this.eventDataService.addEvent(dataEvent).subscribe(()=>
        this.snackBar.open('Evento criado com sucesso','', {duration: 2000})
      );
      this.dialog.closeAll();
    }    
  }

  public cancel(){
    this.dialog.closeAll()
  }

  
  private setForm(): void{
    this.form = this.fb.group({      
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      // image: [null, Validators.required],
      publishedDate: ['']
    });
  }
}
