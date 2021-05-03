import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'ikub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  toggleSideMenu = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.toggleSideMenu = !this.toggleSideMenu;
  }

  public logout(): void {
    this.authService.logout();
  }
}
