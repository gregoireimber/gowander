import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private messageServ: MessagingService,
    private http: HttpClient,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  public unsplashBaseUrl = 'https://api.unsplash.com/';

  public async getPhotosForKeyword(word: string, page: number): Promise<any[]> {
    const accessKey = 'vrdeeovPtNJ3JeNn00Wzg-3Nr1j3YSkU7UnsSAof3tU';
    const url =
      this.unsplashBaseUrl +
      'search/photos?' +
      `page=${page.toString()}
      &per_page=30&query=${word}
      &orientation=landscape&client_id=${accessKey}`;

    const urlResult = await this.http.get(url).toPromise();

    // This is where the result object is
    return Object.entries(urlResult)[2][1];
  }

  // This service will also be used for profile pictures
  public async uploadProfilePicture(userId: string | undefined, event: any) {
    if (!userId) {
      this.messageServ.emitErrorMessage('Could not find the logged in user');
      return;
    }

    const file = event.target.files[0];
    const fileName = file.name ?? 'profile-picture';
    const filePath = `profile-pictures/${userId}/${fileName}`;
    const fileRef = this.storage.ref(filePath);

    let downloadUrl: any;

    let profilePictureUrl: string;

    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      finalize(() => {
        downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe({
          next: (url: string) => {
            if (url) {
              profilePictureUrl = url;

              try {
                // Save the profile picture url against profile
                this.db.collection('users').doc(userId).update({
                  profilePictureUrl: profilePictureUrl,
                });
                return;
              } catch (e) {
                this.messageServ.emitErrorMessage(
                  'Error linking profile picture to account'
                );
              }
            }
          },
        });
      })
    );
  }
}
