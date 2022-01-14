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
    private messageServ: MessagingService
  ) {}

  public createNewTrip(data: TripData): void {
    this.db
      .collection('trips')
      .doc()
      .set({ data })
      .then(() => {
        this.messageServ.emitSuccessMessage('Trip successfully created.');
      })
      .catch((error: any) => {
        console.log('error', error);
        this.messageServ.emitErrorMessage('Error creating new trip.');
      });
  }

  public async getTripsForUser(userId: string): Promise<any[]> {
    const tripSnapshot = this.db
      .collection('trips', (ref) => ref.where('data.linkedUsers', '==', userId))
      .doc()
      .get()
      .subscribe({next: (data: any) => {
        console.log('data', data.get());
      }})
    
      console.log(tripSnapshot);

    // afs.collection('items', ref => {
    //   let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
    //   if (size) { query = query.where('size', '==', size) };
    //   if (color) { query = query.where('color', '==', color) };
    //   return query;
    // }).valueChanges()

    //const querySnapshot = await getDocs(q);
    //do i need a userId here??
    // const tripSnapshot = await this.db
    //   .collection('trips')
    //   .doc()
    //   .get()
    //   .toPromise();
    //    console.log(tripSnapshot.data());

    return [];


    // const userTrips: any[] = [];
    // userTrips.push(tripSnapshot.data());
    // return userTrips;
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
