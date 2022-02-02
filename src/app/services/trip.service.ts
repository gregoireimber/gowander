import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(
    private db: AngularFirestore,
    private messageServ: MessagingService,
    private authService: AuthService
  ) {}

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
      .then(() => this.messageServ.emitSuccessMessage('Trip linked to user.'))
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
        currentUserTripsData.push(Object.values(data));
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
}

export interface TripData {
  name: string;
  type: string;
  continents: string[];
  countries: string[];
  linkedUsers: string[];
  dates?: Date[];
  bucketList?: string[]; // might need more information but keep as string for now
  allowance?: string; // String for now - will need to think about this
  reservations?: string[]; // Again will need to think about this
}
