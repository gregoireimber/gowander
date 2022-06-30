import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { TripData, TripService } from 'src/app/services/trip.service';
import { continents, countries } from 'countries-list';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  public tripData: TripData | null = null;
  public tripId: string | undefined = undefined;
  public countryContinentData: CountryContinentDataType[][] = [];

  private countryList = Object.entries(countries);
  private continentList = Object.entries(continents);

  public timeToTripInDays: number = 0;

  constructor(
    private messageServ: MessagingService,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.tripId = params['tripId'];

        this.tripService.getTrip(params['tripId']).then((snapshot) => {
          const data: { data: any } = snapshot.data() as {
            data: any;
          };
          const rawData = data.data;
          rawData.dates.end = new Date(rawData.dates.end.seconds * 1000);
          rawData.dates.start = new Date(rawData.dates.start.seconds * 1000);
          this.tripData = rawData as TripData;
          this.createContinentCountryRelationship();
          this.getTimeToTrip();
        });

        if (!this.tripId) {
          this.messageServ.emitErrorMessage('Trip could not be loaded');
          this.router.navigate(['/dashboard']);
        }
      },
    });
  }

  private getTimeToTrip(): void {
    this.timeToTripInDays = this.tripService.getTimerValue(
      this.tripData!.dates!.start
    );
  }

  private createContinentCountryRelationship(): void {
    let countryContinentDataTemp: CountryContinentDataType[] = [];

    if (this.tripData?.countries && this.tripData?.continents) {
      // Assign a continent to each country
      this.tripData?.countries.filter((country: string) => {
        const countryObj = this.countryList.find((countryObject) => {
          return countryObject[1].name === country;
        });
        return countryObj
          ? countryContinentDataTemp.push({
              country: country,
              continent: countryObj[1].continent,
              emoji: countryObj[1].emoji,
            })
          : null;
      });

      // Group these into continents
      this.tripData?.continents.filter((continent: any) => {
        const continentObj = this.continentList.find((continentObject) => {
          return continentObject[1] === continent;
        });

        let continentCountryObj: CountryContinentDataType[] = [];

        countryContinentDataTemp.forEach((data) => {
          if (continentObj && data.continent === continentObj[0]) {
            data.continentName = continent;
            continentCountryObj.push(data);
          }
        });
        this.countryContinentData.push(continentCountryObj);
      });
    }
  }

  public backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public onEditTrip(): void {
    this.router.navigate([`/new-trip/${this.tripId}`]);
  }
}

export type CountryContinentDataType = {
  country: string;
  continent: string;
  emoji: any;
  continentName?: string;
};
