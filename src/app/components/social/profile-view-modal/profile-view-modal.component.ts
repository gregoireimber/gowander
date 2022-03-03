import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-view-modal',
  templateUrl: './profile-view-modal.component.html',
  styleUrls: ['./profile-view-modal.component.scss']
})
export class ProfileViewModalComponent implements OnInit {


  public profileData: any;

  constructor(private dialogRef: MatDialogRef<ProfileViewModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ProfileViewModalComponentData) {
    this.profileData = data.profileData;
   }

  ngOnInit(): void {
    console.log(this.profileData);
  }

}

export interface ProfileViewModalComponentData {
  profileData: any;
}