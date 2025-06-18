import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/@shared/services/view.service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  public currentView: 'cards' | 'list' = 'cards';

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.subscription = this.viewService.viewMode$.subscribe((view) => {
      this.currentView = view;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
