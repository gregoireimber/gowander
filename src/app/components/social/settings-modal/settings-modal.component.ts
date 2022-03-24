import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  public profilePicturePath: string;
  public profileData: any;

  constructor(
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsModalComponentData
  ) {
    this.profileData = data.profileData;
    this.profilePicturePath = data.profilePicturePath;
  }

  ngOnInit(): void {}
}

export interface SettingsModalComponentData {
  profileData: any;
  profilePicturePath: string;
}
