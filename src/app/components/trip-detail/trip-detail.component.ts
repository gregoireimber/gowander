import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { TripData, TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  public tripData: TripData | null = null;
  public continentString: string = '';
  public tripId: string | undefined = undefined;

  constructor(
    private messageServ: MessagingService,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.tripId = params['tripId'];

        this.tripService.getTrip(params['tripId']).then((snapshot) => {
          const data: { data: TripData } = snapshot.data() as {
            data: TripData;
          };
          this.tripData = data.data as TripData;
        });

        if (!this.tripId) {
          this.messageServ.emitErrorMessage('Trip could not be loaded');
          this.router.navigate(['/dashboard']);
        }
      },
    });
  }

  public backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
