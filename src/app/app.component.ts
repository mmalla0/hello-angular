import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, public authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.authService.updateUsersInLocalStorage();    
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    })
  }

  handleLoginClicked() {
    this.router.navigate(['/login'])
  }

  handleRegisterClicked() {
    this.router.navigate(['/register'])
  }

  handleLogoutClicked() {
    this.authService.logout()
    this.router.navigate(['/landing'])
  }
}


