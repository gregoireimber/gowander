import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public showMenu = false;
  public isOpen: boolean = false;
  public isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  public onAuthAction(): void {
    if (this.isLoggedIn) {
      this.authService.logOut();
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  /* Open */
  public openNav(): void {
    this.isOpen = true;
  }

  /* Close */
  public closeNav(): void {
    this.isOpen = false;
  }
}
