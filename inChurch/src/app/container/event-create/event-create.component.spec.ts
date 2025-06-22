import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldErrorComponent } from 'src/app/@shared/field-error/field-error.component';
import { ModalDefaultComponent } from 'src/app/@shared/modals/modal-default/modal-default.component';
import { EventCreateComponent } from './event-create.component';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;
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
  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ 
        FormFieldErrorComponent, 
        EventCreateComponent, 
        ModalDefaultComponent 
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        FormBuilder
      ],
      imports:[
        HttpClientTestingModule, 
        MatFormFieldModule, 
        MatSelectModule,
        MatIconModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
