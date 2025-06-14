import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './@shared/shared.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ContainerModule } from './container/container.module';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';

@NgModule({
  declarations: [
    AppComponent,    
    LayoutMainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ComponentsModule,
    ContainerModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
