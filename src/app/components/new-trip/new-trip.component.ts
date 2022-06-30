import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TripData, TripService } from '../../services/trip.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  public step = 1;
  public stepData: TripData = {};
  public progressValue = 0;

  public isEdit = false;
  public tripId: string = '';

  constructor(
    private messageService: MessagingService,
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = !!params['tripId'];
        this.tripId = params['tripId'];

        if (this.isEdit) {
          // This would set the step to 2 if we edit
          // this.step = 2;

          this.tripService.getTrip(params['tripId']).then((snapshot) => {
            const data: { data: any } = snapshot.data() as {
              data: any;
            };
            const rawData = data.data;
            rawData.dates.end = new Date(rawData.dates.end.seconds * 1000);
            rawData.dates.start = new Date(rawData.dates.start.seconds * 1000);
            this.stepData = rawData as TripData;
          });
        }
      },
    });
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
        this.stepData.dates = {
          start: data.tripStartDate,
          end: data.tripEndDate,
        };
        this.stepData.allowance = {
          amount: data.allowanceAmount,
          currency: data.allowanceCurrency,
        };
        this.stepData.reservations = data.reservations;

        this.step = 4;
        break;
      }
      case 5: {
        this.stepData.name = data;
        this.step = 5;
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
    this.step = step;
    this.calcProgressBar();
  }
}
