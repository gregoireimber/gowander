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
    private authServie: AuthService
  ) {}


}
