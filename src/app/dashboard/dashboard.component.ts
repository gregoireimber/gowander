import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewTripComponent } from '../new-trip/new-trip.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) { }

  public isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;

    // If not logged in, navigate to log in
    if (this.isLoggedIn === false) this.router.navigateByUrl('/login');

    // Get the user information
    // Will only be able to do this when I link to the database and have the users populating it with all their information
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(NewTripComponent, {
      data: {name: 'hi'},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}

// To be added to
export interface NewTripData {
  name: string;
}
