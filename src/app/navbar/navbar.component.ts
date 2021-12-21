import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public showMenu = false;
  public isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  // Need a way of getting the inputs from the angular material menu

  // This will probably get changed eventually

  /* Open */
  public openNav(): void {
    this.isOpen = true;
  }

  /* Close */
  public closeNav(): void {
    this.isOpen = false;
  }
}
