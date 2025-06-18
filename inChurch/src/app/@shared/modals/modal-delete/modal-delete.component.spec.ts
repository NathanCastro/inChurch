import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalDeleteComponent } from './modal-delete.component';

describe('ModalDeleteComponent', () => {
  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ModalDeleteComponent>>;
  
  const mockDialogData = {
    title: 'Confirmar exclusão',
    subtitle: 'Tem certeza que deseja excluir este item?'
  };

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ModalDeleteComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      imports: [MatIconModule, MatDialogModule],
    });

    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title and subtitle from dialog data', () => {
    expect(component.title).toBe(mockDialogData.title);
    expect(component.subtitle).toBe(mockDialogData.subtitle);
  });

  it('should emit confirmDelete event and close dialog', () => {
    const emitSpy = spyOn(component.confirmDelete, 'emit');
    
    component.onConfirmDelete();
    
    expect(emitSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});