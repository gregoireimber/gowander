import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SettingsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: SettingsModalComponentData) { }

  ngOnInit(): void {
  }

}

export interface SettingsModalComponentData {
  profileData: any;
}