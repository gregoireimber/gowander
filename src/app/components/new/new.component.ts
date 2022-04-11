import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<NewComponent>
  ) {}

  // this currently isn't working
  public onTripPressed(): void {
    console.log('here');
    this.router.navigateByUrl('/new-trip');
    this.dialogRef.close();
  }
}
