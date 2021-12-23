import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewTripComponent } from '../new-trip/new-trip.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) { }

  public isLoggedIn = false;
  public userInformation: any = '';

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.getUserInfo();

    // If not logged in, navigate to log in
    if (this.isLoggedIn === false) this.router.navigateByUrl('/login');
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(NewTripComponent, {
      data: {name: 'hi'},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  public async getUserInfo() {
    const userId = this.authService.getUserId();
    this.userInformation = await this.authService.getUserInformation(userId).then((response: any) => {
      return response;
    });
  }
}

// To be added to
export interface NewTripData {
  name: string;
}
