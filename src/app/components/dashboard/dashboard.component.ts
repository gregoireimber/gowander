import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewTripComponent } from '../new-trip/new-trip.component';
import { AuthService } from '../../services/auth.service';
import { TripService } from '../../services/trip.service';
import { NewComponent } from '../new/new.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loading = false;
  public isLoggedIn = false;
  public userInformation: any = '';

  public isTripSelected = false;
  public selectedTrip: any = undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.isLoggedIn = this.authService.isLoggedIn;
    this.getUserInfo();

    // If not logged in, navigate to log in
    if (this.isLoggedIn === false) this.router.navigateByUrl('/login');
  }

  public onAdd(): void {
    this.dialog.open(NewComponent, {width: '250px', autoFocus: false});
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

  public onTripSelected(data: any): void {
    if (data) {
      this.isTripSelected = true;
      this.selectedTrip = data;
    }
  }
}

// To be added to
export interface NewTripData {
  name: string;
}
