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

  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter = new EventEmitter<string>();

  public complete = false;
  public loading = false;
  public continentString = '';
  public typeString = '';

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

    console.log(this.tripData);
  }

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  // This is not quite working as expected
  public goNext(): void {
    console.log('here', this.complete);
    if (this.complete) {
      this.router.navigateByUrl('/dashboard');
      return;
    }

    console.log('i should be here too');

    // Save the trip - set loading to true
    this.loading = true;
    if (this.tripData) {
      this.tripService.createNewTrip(this.tripData).then(() => {
        // Set loading to false and complete to true
        this.loading = false;
        this.complete = true;
        return;
      });
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
