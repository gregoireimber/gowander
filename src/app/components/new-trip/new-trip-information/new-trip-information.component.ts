import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-trip-information',
  templateUrl: './new-trip-information.component.html',
  styleUrls: ['./new-trip-information.component.scss'],
})
export class NewTripInformationComponent implements OnInit {
  // Component emitters
  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter = new EventEmitter(); // add a type

  public tripStartDate: Date | undefined;
  public tripEndDate: Date | undefined;

  constructor() {}

  ngOnInit(): void {}

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  public goNext(): void {
    console.log('dates', this.tripEndDate, this.tripStartDate);
  }
}
