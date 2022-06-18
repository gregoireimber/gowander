import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { MessagingService } from './messaging.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(
    private db: AngularFirestore,
    private messageServ: MessagingService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  // Get list of all currencies from API
  public getCurrencies(): Observable<any> {
    return this.http.get('https://openexchangerates.org/api/currencies.json');
  }

  public getTimerValue(date: any): number {
    const dayDot = moment(date);
    const currentDate = moment([
      moment().year(),
      moment().month(),
      moment().date(),
    ]);

    const days = currentDate.diff(dayDot, 'days');

    return Math.abs(days);
  }

  public async deleteTrip(tripId: string) {
    const ref = this.db.collection('trips').doc(tripId).ref;

    ref
      .delete()
      .then(() => {
        this.messageServ.emitSuccessMessage('Trip was successfully deleted');
      })
      .catch(() => {
        this.messageServ.emitErrorMessage(
          'There was an error deleting the trip'
        );
      });
  }

  public getTrip(tripId: string) {
    return this.db.collection('trips').doc(tripId).get().toPromise();
  }

  public async createNewTrip(data: TripData): Promise<void> {
    // Add new trip to 'trips' collection
    let newDocId: string = '';

    await this.db
      .collection('trips')
      .add({ data })
      .then((result: any) => {
        if (result.id) {
          newDocId = result.id;
          this.messageServ.emitSuccessMessage('Trip successfully created.');
        }
      })
      .catch((error: any) => {
        this.messageServ.emitErrorMessage('Error creating new trip.');
      });

    // Get the user
    const userId = this.authService.getUserId() ?? 'null';
    if (userId === 'null')
      this.messageServ.emitErrorMessage('Cannot find logged in user');

    // Get the current trips for that user
    let currentUserTrips: any[] = [];
    const userSnapshot = await this.db
      .collection('users')
      .doc(userId)
      .get()
      .toPromise();
    const userData: any = userSnapshot.data();
    currentUserTrips = userData.trips;

    // Add the new trip to the array
    currentUserTrips.push(newDocId);

    // Update the user information with this new array
    this.db
      .collection('users')
      .doc(userId)
      .update({
        trips: currentUserTrips,
      })
      .then(() => {
        this.messageServ.emitSuccessMessage('Trip linked to user.');
        return;
      })
      .catch(() =>
        this.messageServ.emitErrorMessage('Error linking trip to user.')
      );
  }

  public async getTripsForUser(userId: string): Promise<any> {
    // Get the current user trips
    let currentUserTrips: any[] = [];
    const userSnapshot = await this.db
      .collection('users')
      .doc(userId)
      .get()
      .toPromise();
    const userData: any = userSnapshot.data();
    currentUserTrips = userData.trips;

    // Return the data for each of the user trips
    // Use promise then map to ensure i await results
    const currentUserTripsData: any[] = [];
    await Promise.all(
      currentUserTrips.map(async (trip: string) => {
        const myTripsSnapshot = await this.db
          .collection('trips')
          .doc(trip)
          .get()
          .toPromise();

        const data: any = myTripsSnapshot.data();

        if (data) {
          data.tripId = trip;
          currentUserTripsData.push(Object.values(data));
        }
      })
    );

    // Store in the local storage
    localStorage.setItem(
      'userTrips',
      JSON.stringify({
        tripsData: currentUserTripsData,
        userId: userId,
      })
    );

    return currentUserTripsData;
  }

  public updateTrip(tripId: string, data: TripData): any {}
}

export interface TripData {
  name?: string;
  type?: TripType;
  otherType?: string;
  continents?: string[];
  countries?: string[];
  linkedUsers?: string[];
  dates?: TripDates;
  bucketList?: string[]; // might need more information but keep as string for now
  allowance?: TripAllowance;
  reservations?: string[]; // Again will need to think about this
}

export type TripType = 'ROAD' | 'BEACH' | 'SKI' | 'CITY' | 'OTHER';
export type TripDates = { start: Date | undefined; end: Date | undefined };
export type TripAllowance = {
  amount: number | null;
  currency: string | null;
};
