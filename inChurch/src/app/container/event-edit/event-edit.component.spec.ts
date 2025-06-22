import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { FormFieldErrorComponent } from 'src/app/@shared/field-error/field-error.component';
import { EventEditComponent } from './event-edit.component';

describe('EventEditComponent', () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
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
  
  beforeEach( () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ 
        FormFieldErrorComponent,
        EventEditComponent, 
         
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        FormBuilder
      ],
      imports:[ 
        MatFormFieldModule,
        HttpClientTestingModule, 
        ReactiveFormsModule,
        MatIconModule ,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set imageUrl and patch image control on file selected', () => {
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as Event;

    const readerSpy = jasmine.createSpyObj('FileReader', ['readAsDataURL']);
    readerSpy.result = 'base64-image';
    
    readerSpy.onload = () => {
      component.imageUrl = readerSpy.result;
      component.form.get('image')?.setValue(readerSpy.result);
    };

    spyOn(window as any, 'FileReader').and.returnValue(readerSpy);

    component.form = new FormBuilder().group({
      image: ['']
    });

    component.onFileSelected(mockEvent);

    readerSpy.onload();

    expect(component.imageUrl).toBe('base64-image');
    expect(component.form.get('image')?.value).toBe('base64-image');
  });

  it('should call addEvent and show snackbar on save if form is valid', () => {  
    const updateEventSpy = spyOn(component['eventDataService'], 'updateEvent').and.returnValue(of(mockDialogData));

    component['snackBar'] = mockSnackBar;
    component['dialog'] = mockDialog;

  
    component.ngOnInit(); 
    
    component.form.setValue({
      id: '2',
      title: 'Evento Teste',
      description: 'Descrição Teste',
      status: true,
      image: 'imagem.jpg',
      publishedDate: ''
    });
    component.form.markAsDirty();

    component.save();

    expect(updateEventSpy).toHaveBeenCalledWith(component.form.value);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Evento Editado com sucesso', '', { duration: 2000 });
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });

  it('should call cancel', () => {
    component.cancel()
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });
});
