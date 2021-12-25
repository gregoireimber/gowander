import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gowander';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
