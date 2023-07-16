import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export enum Zahlungsmethode {
  PAYPAL = 'paypal',
  KREDITKARTE = 'kreditkarte',
  DEBITKARTE = 'debitkarte',
  APPLEPAY = 'applepay',
}

import { User } from '../../shared/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private users: User[] = []; 

  currentUser: User | null = null;

  userLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  userType: string = 'unknown';

  constructor(private http: HttpClient, private router: Router,  private toastr: ToastrService) {}

  updateUsersInLocalStorage() {
    const usersToSave = this.users.map((user: User) => {
      return JSON.stringify(user);
    });
    localStorage.setItem('users', usersToSave.toString());
  }

  register2(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<any>(
      'http://localhost:8080/' + 'register',
      data,
      options
    );
  }

  loginCustomer(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<any>(
      'http://localhost:8080/' + 'login',
      data,
      options)
      .pipe(
        tap(response => {
          this.currentUser = response;
          console.log(this.userType);
          this.userLoggedIn.next(true);
        })
    );
  }

  loginEmployee(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<any>(
      'http://localhost:8080/' + 'login-employee',
      data,
      options)
      .pipe(
        tap(response => {
          this.currentUser = response;
          console.log(this.userType);
          this.userLoggedIn.next(true); 
        })
    );
  }

  logout() {
    this.userLoggedIn.next(false);
    this.currentUser = null;
    this.userType = 'unknown';
    this.toastr.success('Logged out', 'Success');
  }

  getCurrentUser(): User | null {
    console.log("The current user is: " + this.currentUser);
    return this.currentUser;
  }
}
