import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/@shared/services/view.service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit{

  public currentView: 'cards' | 'list' = 'cards';

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.viewService.viewMode$.subscribe((view) => {
      this.currentView = view;
    });
  }
}
