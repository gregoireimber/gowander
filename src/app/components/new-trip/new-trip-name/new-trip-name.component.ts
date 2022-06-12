import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripData } from 'src/app/services/trip.service';

@Component({
  selector: 'app-new-trip-name',
  templateUrl: './new-trip-name.component.html',
  styleUrls: ['./new-trip-name.component.scss'],
})
export class NewTripNameComponent implements OnInit {
  @Input() public tripData: TripData | undefined;

  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter = new EventEmitter<string>();

  public tripName = '';
  public noNameError = false;

  ngOnInit(): void {
    if (!this.tripData) return;

    this.tripName = this.tripData.name ?? '';
  }

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  public goNext(): void {
    if (!this.tripName) {
      this.noNameError = true;
      return;
    }

    this.nextStepEmitter.emit(this.tripName);
  }
}
