import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  // Desktop or mobile
  public isMobile = false;
  
  // Tabs for the mobile view
  public selectedTab: 'account' | 'feed' | 'friends' = 'feed';
  
  // Listen to changes in the screen size
  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    if (event.target.innerWidth < 1024) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
    // Get the initial screen size
    if (window.screen.width < 1024) this.isMobile = true;
  }

  public changeTab(tab: any): void {
    this.selectedTab = tab;
  }

}
