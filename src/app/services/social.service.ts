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
    return this.db
      .collection<any>('users', (ref) => {
        return ref.where('username', '==', searchTerm);
      })
      .valueChanges();
  }
}
