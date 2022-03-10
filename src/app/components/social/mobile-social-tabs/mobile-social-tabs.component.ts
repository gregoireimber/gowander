import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-social-tabs',
  templateUrl: './mobile-social-tabs.component.html',
  styleUrls: ['./mobile-social-tabs.component.scss']
})
export class MobileSocialTabsComponent implements OnInit {

  public selectedTab: 'account' | 'feed' | 'friends' = 'feed';

  @Output() selectedTabEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onTabClicked(tab: 'account' | 'feed' | 'friends'): void {
    this.selectedTab = tab;
    this.selectedTabEmitter.emit(tab);
  }

}

