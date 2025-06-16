import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    HeaderComponent
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    
  ],
  exports:[
    MenuComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
