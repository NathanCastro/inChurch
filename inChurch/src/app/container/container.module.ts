import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../@shared/shared.module';
import { CardsComponent } from './cards/cards.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { LoginComponent } from './login/login.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    EventEditComponent,
    EventDetailComponent,
    EventCreateComponent,
    EventFilterComponent,
    TableListComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatSelectModule
    
  ],
  exports: [
    LoginComponent,
    EventFilterComponent,
    TableListComponent,
    CardsComponent
  ],
})
export class ContainerModule { }
