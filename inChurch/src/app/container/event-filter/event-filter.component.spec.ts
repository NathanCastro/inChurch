import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalConfig } from 'src/app/@shared/modals/modal-default/modal-config';
import { SearchService } from 'src/app/@shared/services/search.service';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventFilterComponent } from './event-filter.component';
describe('EventFilterComponent', () => {
  let component: EventFilterComponent;
  let fixture: ComponentFixture<EventFilterComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    const mockSearchService = {
      setSearchTerm: jasmine.createSpy('setSearchTerm')
    };

    TestBed.configureTestingModule({
      declarations: [ EventFilterComponent ],
      imports:[MatIconModule, ReactiveFormsModule, MatButtonModule],
      providers: [
        { provide: SearchService, useValue: mockSearchService },
        { provide: MatDialog, useValue: mockDialog }
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

  it('should set search term when onInputSearch is called', () => {
    const event = { target: { value: 'Angular' } };

    component.onInputSearch(event);

    expect(component['searchService'].setSearchTerm).toHaveBeenCalledWith('Angular');
  });  
  

  it('should open the dialog when insertEvent is called', () => {
    component['dialog'] = mockDialog;

    component.insertEvent();

    expect(mockDialog.open).toHaveBeenCalledWith(EventCreateComponent, ModalConfig.MEDIUM);
  });
});

