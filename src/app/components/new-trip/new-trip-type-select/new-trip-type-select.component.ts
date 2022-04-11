import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TripType } from 'src/app/services/trip.service';

@Component({
  selector: 'app-new-trip-type-select',
  templateUrl: './new-trip-type-select.component.html',
  styleUrls: ['./new-trip-type-select.component.scss'],
})
export class NewTripTypeSelectComponent implements OnInit {
  public nextLoading = false;

  public showOtherText = false;
  public otherText: string = '';

  @Output() public nextStepEmitter = new EventEmitter<{
    type: TripType;
    otherType: string;
  }>();

  constructor() {}

  ngOnInit(): void {}

  public goToStep2(type: TripType, next = false) {
    // Show the input field
    if (type === 'OTHER' && !next) {
      this.showOtherText = true;
      return;
    }

    // Go to next with the other trip type
    if (type === 'OTHER' && next && this.showOtherText) {
      console.log(this.otherText);
    }

    this.nextStepEmitter.emit({ type, otherType: this.otherText });
  }
}
