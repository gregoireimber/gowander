import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TripAllowance, TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-new-trip-information',
  templateUrl: './new-trip-information.component.html',
  styleUrls: ['./new-trip-information.component.scss'],
})
export class NewTripInformationComponent implements OnInit {
  // Component emitters
  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter =
    new EventEmitter<informationComponentOutput>(); // add a type

  // Date variables
  public startDateFormControl = new FormControl(null);
  public endDateFormControl = new FormControl(null);

  // Allowance
  public currencySelected: string | undefined = undefined;

  public currencies: { name: 'USD' | 'EUR' | 'GBP'; value: string }[] = [
    { name: 'GBP', value: '£' },
    { name: 'USD', value: '$' },
    { name: 'EUR', value: '€' },
  ];

  // Change the type later
  public allCurrencies: string[] = [];
  public showMoreCurrencies = false;

  public allowanceAmount: number | undefined;

  // Reservations
  public reservations = '';

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getCurrencies().subscribe({
      next: (data) => {
        this.allCurrencies = Object.keys(data);
      },
    });
  }

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  public goNext(): void {
    this.nextStepEmitter.emit({
      tripStartDate: this.startDateFormControl.value,
      tripEndDate: this.endDateFormControl.value,
      allowanceAmount: this.allowanceAmount,
      allowanceCurrency: this.currencySelected,
      reservations: this.reservations,
    });
  }

  public get validateStep(): boolean {
    return !!this.startDateFormControl.value && !!this.endDateFormControl.value;
  }
}

type informationComponentOutput = {
  tripStartDate: Date | undefined;
  tripEndDate: Date | undefined;
  allowanceAmount: number | undefined;
  allowanceCurrency: string | undefined;
  reservations: string;
};
