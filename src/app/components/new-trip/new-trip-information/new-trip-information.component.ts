import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TripAllowance } from 'src/app/services/trip.service';

@Component({
  selector: 'app-new-trip-information',
  templateUrl: './new-trip-information.component.html',
  styleUrls: ['./new-trip-information.component.scss'],
})
export class NewTripInformationComponent {
  // Component emitters
  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter =
    new EventEmitter<informationComponentOutput>(); // add a type

  // Date variables
  public startDateFormControl = new FormControl(null);
  public endDateFormControl = new FormControl(null);

  // Allowance
  public currencySelected: { name: 'USD' | 'EUR' | 'GBP'; value: string } = {
    name: 'GBP',
    value: '£',
  };

  public currencies: { name: 'USD' | 'EUR' | 'GBP'; value: string }[] = [
    { name: 'GBP', value: '£' },
    { name: 'USD', value: '$' },
    { name: 'EUR', value: '€' },
  ];

  public allowanceAmount: number | undefined;

  // Reservations
  public reservations = '';

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  public goNext(): void {
    this.nextStepEmitter.emit({
      tripStartDate: this.startDateFormControl.value,
      tripEndDate: this.endDateFormControl.value,
      allowanceAmount: this.allowanceAmount,
      allowanceCurrency: this.currencySelected.name,
      reservations: this.reservations,
    });
  }
}

type informationComponentOutput = {
  tripStartDate: Date | undefined;
  tripEndDate: Date | undefined;
  allowanceAmount: number | undefined;
  allowanceCurrency: 'USD' | 'EUR' | 'GBP';
  reservations: string;
};
