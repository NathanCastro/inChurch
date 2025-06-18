import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalDefaultComponent } from './modal-default.component';

describe('ModalDefaultComponent', () => {
  let component: ModalDefaultComponent;
  let fixture: ComponentFixture<ModalDefaultComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;  
  
  beforeEach( () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);

    TestBed.configureTestingModule({
      declarations: [ ModalDefaultComponent ],
      imports: [MatIconModule],
      providers: [ { provide: MatDialog, useValue: mockDialog }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeAll when close() is called and dialog exists', ()=> {
    component.close();
    expect(mockDialog.closeAll).toHaveBeenCalled();
  });
  it('should not throw error when dialog is undefined', () => {
    component.dialog = undefined as any;
    expect(() => component.close()).not.toThrow();
  });
});