import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldErrorComponent } from 'src/app/@shared/field-error/field-error.component';
import { ModalDefaultComponent } from 'src/app/@shared/modals/modal-default/modal-default.component';
import { EventDetailComponent } from './event-detail.component';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

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
    TestBed.configureTestingModule({
      declarations: [ 
        ModalDefaultComponent,
        EventDetailComponent, 
        FormFieldErrorComponent 
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialog, useValue: mockDialog },
        FormBuilder
      ],
      imports:[
        MatFormFieldModule,
        HttpClientTestingModule, 
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
