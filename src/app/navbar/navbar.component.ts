import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public showMenu = false;

  ngOnInit(): void {
  }

  // Need a way of getting the inputs from the angular material menu

  // This will probably get changed eventually 

}
