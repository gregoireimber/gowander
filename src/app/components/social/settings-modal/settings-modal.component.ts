import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  public defaultProfilePicturePath: string;
  public profileData: any;
  public loggedInUserId: string | undefined;

  public progressBar = false;

  constructor(
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsModalComponentData,
    private authService: AuthService,
    private imageService: ImageService,
    private messageServ: MessagingService
  ) {
    this.profileData = data.profileData;
    this.defaultProfilePicturePath = data.profilePicturePath;
  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getUserId();
  }

  // Add a return type
  public async uploadProfilePicture(event: any) {
    const upload = await this.imageService.uploadProfilePicture(
      this.loggedInUserId,
      event
    );

    if (upload) {
      upload.subscribe({
        next: (url) => {
          if (url) {
            this.progressBar = true;

            if (url.bytesTransferred === url.totalBytes) {
              this.progressBar = false;
              this.reloadData();
            }
          }
        },
      });
    }
  }

  private async reloadData(): Promise<void> {
    this.profileData = await this.authService.getUserInformation(
      this.loggedInUserId
    );
  }
}

export interface SettingsModalComponentData {
  profileData: any;
  profilePicturePath: string;
}
