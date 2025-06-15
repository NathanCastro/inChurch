import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CardsComponent } from './cards/cards.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TableListComponent } from './table-list/table-list.component';



@NgModule({
  declarations: [
    CardsComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[
    CardsComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    TableListComponent
  ]
})
export class ComponentsModule { }
