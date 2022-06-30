import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { TripData, TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-new-trip-complete',
  templateUrl: './new-trip-complete.component.html',
  styleUrls: ['./new-trip-complete.component.scss'],
})
export class NewTripCompleteComponent implements OnInit {
  @Input() public tripData: TripData | undefined;
  @Input() public isEdit = false;
  @Input() public tripId: string = '';

  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter = new EventEmitter<string>();

  public complete = false;
  public loading = false;
  public continentString = '';
  public typeString = '';
  public currencySelectedName: string = '';
  public tripTimeInDays: number = 0;

  constructor(
    private messageService: MessagingService,
    private router: Router,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    if (!this.tripData)
      this.messageService.emitErrorMessage('Trip data not found');

    this.createContinentString();
    this.createTypeString();

    this.tripService.getCurrencies().subscribe({
      next: (data) => {
        if (!this.tripData?.allowance?.currency) {
          this.currencySelectedName = 'No currency was selected.';
          return;
        }

        const currencyIndex = Object.keys(data).findIndex((c) => {
          return c === this.tripData!.allowance!.currency;
        });

        this.currencySelectedName = Object.values(data)[
          currencyIndex
        ] as string;
      },
    });

    this.getTimeToTrip();
  }

  private getTimeToTrip(): void {
    this.tripTimeInDays = this.tripService.getTimerValue(
      this.tripData!.dates!.start
    );
  }

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  public goNext(): void {
    if (this.complete) {
      this.router.navigateByUrl('/dashboard');
      return;
    }

    // Save the trip - set loading to true
    this.loading = true;
    if (this.tripData) {
      if (this.isEdit) {
        this.tripService.updateTrip(this.tripId, this.tripData).then(() => {
          this.loading = false;
          this.complete = true;
          return;
        });
      } else {
        this.tripService.createNewTrip(this.tripData).then(() => {
          // Set loading to false and complete to true
          this.loading = false;
          this.complete = true;
          return;
        });
      }
    }
  }

  private createContinentString(): void {
    this.continentString = this.tripData?.continents
      ? this.tripData.continents.join(', ')
      : '';
  }

  private createTypeString(): void {
    switch (this.tripData?.type) {
      case 'ROAD':
        this.typeString = 'Roadtrip';
        break;
      case 'BEACH':
        this.typeString = 'Beach holiday';
        break;
      case 'SKI':
        this.typeString = 'Ski trip';
        break;
      case 'CITY':
        this.typeString = 'City trip';
        break;
      case 'OTHER':
        this.typeString = 'Trip';
        break;
    }
  }
}
