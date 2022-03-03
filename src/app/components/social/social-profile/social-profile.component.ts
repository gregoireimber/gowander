import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss']
})
export class SocialProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public openProfileView(): void {
    // Open the profile modal
  }

}
