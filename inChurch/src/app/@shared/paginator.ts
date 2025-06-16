import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  template: `    
    <mat-paginator 
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
      showFirstLastButtons
      aria-label="Selecione a página do evento"
      (page)="pageChange.emit($event)">
    </mat-paginator> 
  `
})

export class PaginatorComponent {
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25];
  @Output() pageChange = new EventEmitter<PageEvent>();
}