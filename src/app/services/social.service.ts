import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(
    private db: AngularFirestore,
    private messageServ: MessagingService,
    private authService: AuthService
  ) {}

  // TODO: add return types and stronger types
  public async getUsers(searchTerm: string) {
    console.log(searchTerm);

    console.log(this.db
        .collection<any>('users', (ref) => {
          return ref.where('email', '==', searchTerm);
        })
        .valueChanges().toPromise(), 'lolj');

    return this.db
      .collection<any>('users', (ref) => {
        return ref.where('email', '==', searchTerm);
      })
      .valueChanges();
  }
}
