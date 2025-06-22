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
import { of } from 'rxjs';
import { FormFieldErrorComponent } from 'src/app/@shared/field-error/field-error.component';
import { ModalDefaultComponent } from 'src/app/@shared/modals/modal-default/modal-default.component';
import { Events } from 'src/app/models/events';
import { EventCreateComponent } from './event-create.component';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockEvent: Events = {
    id: '1',
    title: 'Evento Teste',
    description: 'Descrição Teste',
    status: true,
    image: 'imagem.jpg',
    publishedDate: '2024-06-21'
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
  it('should call ngOnInit', () => {
    const spySetForm = spyOn<any>(component, 'setForm')
    component.ngOnInit()
    expect(spySetForm).toHaveBeenCalled();
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
    const addEventSpy = spyOn(component['eventDataService'], 'addEvent').and.returnValue(of(mockEvent));
    component['snackBar'] = mockSnackBar;
    component['dialog'] = mockDialog;

  
    component.ngOnInit(); 
    
    component.form.setValue({
      title: 'Evento Teste',
      description: 'Descrição Teste',
      status: true,
      image: 'imagem.jpg',
      publishedDate: ''
    });

    component.save();

    expect(addEventSpy).toHaveBeenCalledWith(component.form.value);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Evento criado com sucesso', '', { duration: 2000 });
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });

  it('should call cancel', () => {
    component.cancel()
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });
});
