import { Component, OnInit } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-social-main',
  templateUrl: './social-main.component.html',
  styleUrls: ['./social-main.component.scss'],
})
export class SocialMainComponent implements OnInit {
  public socialSearchTerm = '';
  public searchResult = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    trips: [],
    friends: [],
    incomingFR: [],
    outgoingFR: [],
  };

  constructor(private socialService: SocialService) {}

  ngOnInit(): void {}

  public async onSearch() {
    (await this.socialService.getUsers(this.socialSearchTerm)).subscribe({
      next: (result) => {
        this.searchResult = result[0];
      },
    });
  }
}
