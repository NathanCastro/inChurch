import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormFieldErrorComponent } from './field-error/field-error.component';
import { ModalDefaultComponent } from './modals/modal-default/modal-default.component';
import { ModalDeleteComponent } from './modals/modal-delete/modal-delete.component';
import { PaginatorComponent } from './paginator/paginator';

@NgModule({
  declarations: [
    PaginatorComponent,
    FormFieldErrorComponent,
    ModalDefaultComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    PaginatorComponent,
    FormFieldErrorComponent,
    ModalDefaultComponent,
    ModalDeleteComponent
  ]
})
export class SharedModule { }
