import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocialService } from 'src/app/services/social.service';
import { ProfileViewModalComponent } from '../profile-view-modal/profile-view-modal.component';

@Component({
  selector: 'app-social-main',
  templateUrl: './social-main.component.html',
  styleUrls: ['./social-main.component.scss'],
})
export class SocialMainComponent implements OnInit {
  public socialSearchTerm = '';
  public searchResult = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    trips: [],
    friends: [],
    incomingFR: [],
    outgoingFR: [],
  };

  constructor(private socialService: SocialService, private dialog: MatDialog) { }

  ngOnInit(): void { }

  public async onSearch() {
    (await this.socialService.getUsers(this.socialSearchTerm)).subscribe({
      next: (result) => {
        this.searchResult = result[0];
      },
    });
  }

  public onSearchResultClicked(data: any): void {
    // Open the profile view modal
    const dialogRef = this.dialog.open(ProfileViewModalComponent, {
      width: '700px', data: {
        profileData: this.searchResult
      }
    });

    // Reset the result and the search term
    this.socialSearchTerm = '';
    this.searchResult = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      trips: [],
      friends: [],
      incomingFR: [],
      outgoingFR: [],
    };

    // Do I need to add an after closed method?
  }
}
