import { Component, OnInit } from '@angular/core';
//import { FormBuilder } from '@angular/forms';
import { AuthService } from './services/auth-service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private authService: AuthService) {}

  ngOnInit(){
    this.authService.updateUsersInLocalStorage();    
  }
}
