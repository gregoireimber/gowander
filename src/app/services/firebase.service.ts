import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  public async initializeFirebase(): Promise<void> {
    await firebase.initializeApp(environment.firebase);
  }
}
