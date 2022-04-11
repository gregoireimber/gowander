import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TripData, TripService } from '../../services/trip.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  public step = 1;
  public stepData: TripData = {};
  public progressValue = 0;

  constructor(
    private authService: AuthService,
    private tripService: TripService,
    private messageService: MessagingService
  ) {}

  ngOnInit(): void {
    this.calcProgressBar();
  }

  private calcProgressBar(): void {
    this.progressValue = Math.round((this.step / 6) * 100);
  }

  public onStepChangeFwd(data: any, step: number) {
    switch (step) {
      case 2: {
        this.stepData.type = data.type;
        if (data.otherType) this.stepData.otherType = data.otherType;
        this.step = 2;
        break;
      }
      case 3: {
        this.stepData.continents = data.continents;
        this.stepData.countries = data.countries;
        this.step = 3;
        break;
      }
      case 4: {
        console.log();
        break;
      }
      default: {
        this.step = 1;
        this.messageService.emitErrorMessage(
          'This should not happen, contact tech'
        );
      }
    }

    this.calcProgressBar();
  }

  public onStepChangeBckwd(step: number) {
    console.log('hello');
    this.step = step;
    this.calcProgressBar();
  }

  // public submitForm(): void {
  // get the logged in user as the default value for linkedUsers
  // Should never be null because can only get here if someone is logged in
  // const loggedInUser = this.authService.getUserId() ?? 'null';

  // THis will need to be changed
  // const tripData: TripData = {
  //   name: this.stepOneGroup.controls['tripName'].value,
  //   type: 'ROAD',
  //   continents: this.continentsSelected,
  //   countries: this.countriesSelected,
  //   linkedUsers: [loggedInUser],
  // };
  // console.log(this.countriesSelected, this.continentsSelected);

  // this.tripService.createNewTrip(tripData);
  // this.dialogRef.close();
  // }
}
