import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-trip-name',
  templateUrl: './new-trip-name.component.html',
  styleUrls: ['./new-trip-name.component.scss'],
})
export class NewTripNameComponent {
  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter = new EventEmitter<string>();

  public tripName = '';
  public noNameError = false;

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
