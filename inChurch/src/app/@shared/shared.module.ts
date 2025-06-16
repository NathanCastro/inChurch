import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports:[
    PaginatorComponent
  ]
})
export class SharedModule { }
