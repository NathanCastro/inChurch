import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { SearchService } from 'src/app/@shared/services/search.service';
import { EventDataService } from 'src/app/services/event-data.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { CardsComponent } from './cards.component';

describe('CardsComponentf', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
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
      declarations: [ CardsComponent ],
      imports:[
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: EventDataService, useValue: mockEventDataService },
        { provide: SearchService, useValue: mockSearchService },
        FormBuilder
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllEvents on init and subscribe to eventsUpdatedSubject', () => {
  const getAllEventsSpy = spyOn<any>(component as any, 'getAllEvents');

  component.paginator = {
    _intl: { itemsPerPageLabel: '' }
  } as any;

  const subject = new Subject<void>();
  component['eventDataService'] = {
    eventsUpdatedSubject: subject
  } as any;

  component.ngOnInit();

  expect(getAllEventsSpy).toHaveBeenCalledTimes(1);

  subject.next();

  expect(getAllEventsSpy).toHaveBeenCalledTimes(2);
  expect(component.paginator._intl.itemsPerPageLabel).toBe('Itens por pág');
});


  it('should open edit dialog on onEditEvent', () => {
  component.onEditEvent(mockDialogData);
    expect(mockEventDataService.getById).toHaveBeenCalledWith(mockDialogData.id);
    expect(mockDialog.open).toHaveBeenCalledWith(EventEditComponent, {
      ...ModalConfig.MEDIUM,
      data: mockDialogData
    });    
  });

  it('should open detail dialog on openEventDetails', () => {
    component.openEventDetails('1');
    expect(mockEventDataService.getById).toHaveBeenCalledWith('1');
    expect(mockDialog.open).toHaveBeenCalledWith(EventDetailComponent, {
      ...ModalConfig.MEDIUM,
      data: mockDialogData
    });
  });

  it('should confirm and delete event on confirmDeleteEvent', () => {
    const confirmDeleteSubject = new Subject<void>();
    const modalRefMock = {
      componentInstance: {
        confirmDelete: confirmDeleteSubject.asObservable()
      }
    };
    mockDialog.open.and.returnValue(modalRefMock as any);

    component.confirmDeleteEvent('1');
    confirmDeleteSubject.next();

    expect(mockEventDataService.deleteEvent).toHaveBeenCalledWith('1');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Evento apagado com sucesso', '', { duration: 2000 });
  });

  it('should update page on onPageChange', () => {
    const event = { pageIndex: 1, pageSize: 5 } as PageEvent;
    component.events = [mockDialogData, mockDialogData, mockDialogData, mockDialogData, mockDialogData, mockDialogData];
    component.filterEvents = [...component.events];
    component.onPageChange(event);

    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(5);
    expect(component.paginatedEvents.length).toBeGreaterThan(0);
  });
});
