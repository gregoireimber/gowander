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

    console.log(this.profileData, this.profileData.profilePictureUrl);
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
            // Can now do a loader or a spinner instead of the messageservice
            // if (url.bytesTransferred === 0) {
            //   this.messageServ.emitSuccessMessage('Upload started');
            // } else if (url.bytesTransferred === url.totalBytes) {
            //   this.messageServ.emitSuccessMessage('Upload finished!');
            // }

            if (url.bytesTransferred === url.totalBytes) {
              this.profileData = this.authService
                .getUserInformation(this.loggedInUserId)
                .then((response: any) => {
                  return response;
                });
            }
          }
        },
      });
    }
  }
}

export interface SettingsModalComponentData {
  profileData: any;
  profilePicturePath: string;
}
