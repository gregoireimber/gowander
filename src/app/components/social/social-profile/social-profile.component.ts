import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileViewModalComponent } from '../profile-view-modal/profile-view-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss'],
})
export class SocialProfileComponent implements OnInit {
  constructor(private authService: AuthService, public dialog: MatDialog) {}

  public profileData: any;

  // This will most likely be a part of profileData in the future when it is saved against a profile
  public defaultProfilePicturePath =
    '../../../../assets/images/dummy-profile.png';

  async ngOnInit(): Promise<void> {
    const loggedInUserId = this.authService.getUserId();
    this.profileData = await this.authService.getUserInformation(
      loggedInUserId
    );
  }

  public openProfileView(): void {
    this.dialog.open(ProfileViewModalComponent, {
      data: { profileData: this.profileData },
      maxWidth: '600px',
    });
  }

  public openNotifications(): void {
    // Create a notifications component and open it here
  }

  // For all of the modals opened from here, should I be using
  // max width instead of width - thinking about mobile

  // Or I dont send in a width and define it all from within the modal
  public openSettings(): void {
    this.dialog.open(SettingsModalComponent, {
      data: {
        profileData: this.profileData,
        defaultProfilePicturePath: this.defaultProfilePicturePath,
      },
    });
  }
}
