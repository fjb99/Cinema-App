import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ikub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toggleSideMenu = true; 

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.toggleSideMenu = !this.toggleSideMenu;
  }

}
