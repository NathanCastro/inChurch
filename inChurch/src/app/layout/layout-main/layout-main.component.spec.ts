import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CardsComponent } from 'src/app/container/cards/cards.component';
import { EventFilterComponent } from 'src/app/container/event-filter/event-filter.component';
import { TableListComponent } from 'src/app/container/table-list/table-list.component';
import { LayoutMainComponent } from './layout-main.component';

describe('LayoutMainComponent', () => {
  let component: LayoutMainComponent;
  let fixture: ComponentFixture<LayoutMainComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
    let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
    
    const mockDialogData = {
      id: '1',
      title: 'Test Event',
      description: 'Test Description',
      status: true,
      image: 'test-image.jpg',
      publishedDate: '2023-01-01'
    };
    
    
  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ 
        LayoutMainComponent,
        HeaderComponent,
        EventFilterComponent,
        TableListComponent,
        CardsComponent, 
        FooterComponent,
        MenuComponent
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },        
      ],
      imports:[
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule, 
        ReactiveFormsModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
