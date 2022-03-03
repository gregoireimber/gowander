import { Component, OnInit } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-social-main',
  templateUrl: './social-main.component.html',
  styleUrls: ['./social-main.component.scss']
})
export class SocialMainComponent implements OnInit {
  public socialSearchTerm = '';
  constructor(private socialService: SocialService) { }

  ngOnInit(): void {
  }

  public async onSearch() {
  
    const users = await this.socialService.getUsers(this.socialSearchTerm).then((result) => {
      console.log('is this right?', result);
    });
    console.log(users);

    // the below subscribe is working when I have it in the service but it isn't working when I add it here :(
    
    // .subscribe({
    //   next: (result) => {
    //     console.log(result);
    //     return result;
    //   },
    // });
  }

}
