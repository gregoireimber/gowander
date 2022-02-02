import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit, OnChanges {
  @Input() public tripData: any = undefined;

  public trip: any = undefined;
  public continentString: string = '';

  constructor(private messageServ: MessagingService) {}

  ngOnInit(): void {
    if (!this.tripData)
      this.messageServ.emitErrorMessage('Trip could not be loaded.');
      
    this.trip = this.tripData[0][0];
    this.continentString = this.tripData[1];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If the input has been changed - update
    if (changes.tripData) {
      this.tripData = changes.tripData.currentValue;
      this.trip = this.tripData[0][0];
      this.continentString = this.tripData[1];
    }
  }
}
