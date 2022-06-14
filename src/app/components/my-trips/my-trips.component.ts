import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {
  public myTrips: any[] = [];
  public userId: string = 'null';
  public loading = true;

  public myTripsContinentString: string[] = [];

  @Output() tripSelected = new EventEmitter();

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() ?? 'null';
    if (this.userId === 'null') this.router.navigateByUrl('/home');

    this.getUserTrips();
  }

  public async getUserTrips() {
    this.loading = true;
    await this.tripService
      .getTripsForUser(this.userId)
      .then((data: any) => {
        const rawTestTripData = data;
        rawTestTripData.forEach((tripData: any) => {
          this.myTrips.push(Object.values(tripData));
        });
      })
      .then(() => {
        this.loading = false;
      });

    this.createContinentString();
  }

  public deleteTrip(trip: any): void {
    this.dialog
      .open(DeleteConfirmationComponent, { width: '300px', autoFocus: false })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            this.tripService.deleteTrip(trip[1]).then(() => {
              this.myTrips = [];
              this.getUserTrips();
            });
          }
        },
      });
  }

  private createContinentString(): void {
    this.myTripsContinentString = [];
    this.myTrips.forEach((trip: any) => {
      const continents: string = trip[0].continents.join(', ');
      this.myTripsContinentString.push(continents);
    });
  }

  public onOpenTrip(index: number): void {
    const tripToEmit = [
      this.myTrips[index],
      this.myTripsContinentString[index],
    ];
    this.tripSelected.emit(tripToEmit);
  }
}
