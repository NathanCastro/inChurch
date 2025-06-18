import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-default',
  templateUrl: './modal-default.component.html',
  styleUrls: ['./modal-default.component.scss']
})
export class ModalDefaultComponent {
 @Input() showFooter = true;

  constructor(public dialog: MatDialog) {}

  public close(): void {
    if (this.dialog) {
      this.dialog.closeAll();
    }
  }
}
