import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { ModalDeleteComponent } from 'src/app/@shared/modals/modal-delete/modal-delete.component';
import { SearchService } from 'src/app/@shared/services/search.service';
import { EventDataService } from 'src/app/services/event-data.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { TableListComponent } from './table-list.component';

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockEventDataService: any;
  let mockSearchService: any;

  const mockDialogData = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    status: true,
    image: 'test-image.jpg',
    publishedDate: '2023-01-01'
  };

  mockEventDataService = {
    getById: jasmine.createSpy('getById').and.returnValue(of(mockDialogData)),
    deleteEvent: jasmine.createSpy('deleteEvent').and.returnValue(of({})),
    getAll: jasmine.createSpy('getAll').and.returnValue(of([mockDialogData])),
    eventsUpdatedSubject: new Subject()
  };

  mockSearchService = {
    searchTerm$: new Subject()
  };
  
  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ TableListComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: EventDataService, useValue: mockEventDataService },
        { provide: SearchService, useValue: mockSearchService },
        FormBuilder
      ],
      imports:[ 
        MatFormFieldModule,
        HttpClientTestingModule, 
        ReactiveFormsModule,
        MatIconModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog to edit event when onEditEvent is called', () => {
    
    mockEventDataService.getById.and.returnValue(of(mockDialogData));

    component.onEditEvent(mockDialogData);

    expect(mockEventDataService.getById).toHaveBeenCalledWith(mockDialogData.id);
    expect(mockDialog.open).toHaveBeenCalledWith(EventEditComponent, {
      ...ModalConfig.MEDIUM,
      data: mockDialogData
    });
  });

  it('should filter events based on search term', () => {
    const searchTerm = 'Test';

  component.eventosFiltrados = [mockDialogData];
  mockSearchService.searchTerm$.next(searchTerm);
    component.paginator = {} as MatPaginator;

    component['listenToSearchTerm']();

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toContain(searchTerm);
  });

  it('should open dialog with event details', () => {
   
    mockEventDataService.getById.and.returnValue(of(mockDialogData));

    component.openEventDetails(mockDialogData.id);

    expect(mockEventDataService.getById).toHaveBeenCalledWith(mockDialogData.id);
    expect(mockDialog.open).toHaveBeenCalledWith(EventDetailComponent, {
      ...ModalConfig.MEDIUM,
      data: mockDialogData
    });
  });

  it('should confirm and delete event when confirmDeleteEvent is called', () => {
    const mockComponentInstance = {
      confirmDelete: of(null)
    };

    mockDialog.open.and.returnValue({ componentInstance: mockComponentInstance } as any);
    mockEventDataService.deleteEvent.and.returnValue(of({}));

    component.confirmDeleteEvent('123');

    expect(mockDialog.open).toHaveBeenCalledWith(ModalDeleteComponent, {
      data: {
        title: 'Deletar',
        subtitle: 'Deseja apagar?'
      }
    });

    expect(mockEventDataService.deleteEvent).toHaveBeenCalledWith('123');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Evento apagado com sucesso', '', { duration: 2000 });
  });

  




});
