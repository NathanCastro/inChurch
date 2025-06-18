import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Events } from 'src/app/models/events';
import { EventDataService } from 'src/app/services/event-data.service';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { EventFilterComponent } from './event-filter.component';
describe('EventFilterComponent', () => {
  let component: EventFilterComponent;
  let fixture: ComponentFixture<EventFilterComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;  
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockEventDataService: jasmine.SpyObj<EventDataService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<EventEditComponent>>;

  const mockEvent: Events = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    status: true,
    image: 'test-image-url',
    publishedDate: '2023-01-01'
  };
  
  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockEventDataService = jasmine.createSpyObj('EventDataService', ['updateEvent']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);


    await TestBed.configureTestingModule({
      declarations: [ EventFilterComponent ],
      imports:[MatIconModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: EventDataService, useValue: mockEventDataService },
        { provide: MAT_DIALOG_DATA, useValue: mockEvent },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});