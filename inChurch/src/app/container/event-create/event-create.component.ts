import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Events } from 'src/app/models/events';
import { options } from './../../constants/selector-options';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit{
  imagePreview: string | null = null;
  imageBase64: string | ArrayBuffer | null = null;

  public form: FormGroup;
  public events: Events[] = [];
  public selectedValue: string;  
  public options = options;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog    
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

  }
  public cancel(){
    this.dialog.closeAll()
  }

  
  private setForm(): void{
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ticket: ['', Validators.required],
      image: [null, Validators.required],
      publishedDate: [null]
    });
  }
}
