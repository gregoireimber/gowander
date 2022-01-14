import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewTripComponent } from '../new-trip/new-trip.component';
import { AuthService } from '../../services/auth.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private tripService: TripService,
  ) {}

  public loading = false;
  public isLoggedIn = false;
  public userInformation: any = '';

  ngOnInit(): void {
    this.loading = true;
    this.isLoggedIn = this.authService.isLoggedIn;
    this.getUserInfo();

    // If not logged in, navigate to log in
    if (this.isLoggedIn === false) this.router.navigateByUrl('/login');
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(NewTripComponent, {
      data: { name: 'hi' },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  public async getUserInfo() {
    const userId = this.authService.getUserId();
    this.userInformation = await this.authService
      .getUserInformation(userId)
      .then((response: any) => {
        this.loading = false;
        return response;
      });
  }

  public getUserTrips() {
    const userId = this.authService.getUserId() ?? 'null';
    this.tripService.getTripsForUser(userId);
    console.log(this.tripService.getTripsForUser(userId));
  }
}

// To be added to
export interface NewTripData {
  name: string;
}
