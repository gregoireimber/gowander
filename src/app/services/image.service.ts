import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private messageServ: MessagingService,
    private http: HttpClient
  ) {}

  public unsplashBaseUrl = 'https://api.unsplash.com/';

  //photos/?client_id=YOUR_ACCESS_KEY

  public async getPhotosForKeyword(word: string): Promise<any[]> {
    const url =
      this.unsplashBaseUrl +
      'search/photos?' +
      `page=1&query=${word}&orientation=landscape&client_id=vrdeeovPtNJ3JeNn00Wzg-3Nr1j3YSkU7UnsSAof3tU`;

    const urlResult = await this.http.get(url).toPromise();

    // This is where the result object is
    return Object.entries(urlResult)[2][1];
  }
}