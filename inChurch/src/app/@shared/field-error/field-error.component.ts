import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  template: `
    <div *ngIf="control && control.invalid && (control.dirty || control.touched)" class="text-red-500 text-sm mt-1">
      <div *ngIf="control.errors?.['required']">Este campo é obrigatório.</div>
    </div>
  `
})
export class FormFieldErrorComponent {
  @Input() control!: AbstractControl | null;
}