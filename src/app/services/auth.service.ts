import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export enum Zahlungsmethode {
  PAYPAL = 'paypal',
  KREDITKARTE = 'kreditkarte',
  DEBITKARTE = 'debitkarte',
  APPLEPAY = 'applepay',
}
/*
export interface UserModel {
  id?: number,
  name?: string,
  email: string,
  password: string,
  zahlungsmethode?: Zahlungsmethode
}
*/
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      //name: 'Admin',                       // TODO: name rausnehmen
      email: 'admin@admin.com',
      password: 'adminPassword123!',
      // zahlungsmethode: Zahlungsmethode.KREDITKARTE

      firstName: 'Ad',
      lastName: 'min',
      addressId: 1,
      methodOfPayment: 'Cash',
      cartId: 1,
      stockpileId: 1,
    },
    {
      id: 2,
      // name: 'Maya Malla',                 // TODO: name rausnehmen
      email: 'maya@gmail.com',
      password: 'mayqapassword!',
      // zahlungsmethode: Zahlungsmethode.APPLEPAY
      firstName: 'Maya',
      lastName: 'Malla',
      addressId: 2,
      methodOfPayment: 'Cash',
      cartId: 2,
      stockpileId: 2,
    },
  ];
  currentUser: User | null = null;

  usersUpdate: Subject<User[]> = new BehaviorSubject<User[]>(this.users);

  userLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  userType: string; //*ngIf="this.authService.userType == 'customer' "

  constructor(private http: HttpClient, private router: Router) {}

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

  addAddressToCustomer(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<any>(
      'http://localhost:8080/' + 'add-address',
      data,
      options
    );
  }

  updateCustomerAdress(customerId: number, data) {              // data = Adresse
    console.log("Diese CustomerId wird der Methode updateCustomer übergeben: ", customerId);
    console.log("diese address_id soll der customer-Tabelle übergeben werden: ", data.address_id)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.put<any>(
      'http://localhost:8080/customer/' + customerId + '/address',
      { address_id: data },
      options
    );
  }
  /*   register (user: User) {
    const userEmail = user.email.toLowerCase();

    const userIndex = this.users.findIndex((user: User) => user.email === userEmail);

    if (userIndex === -1) {
            
      const lastUserId: number = this.users[this.users.length - 1].id;
      
      this.users.push(
        {

          id: lastUserId + 1 ,
         // name: user.name,
          email: user.email.toLowerCase(),
          password: user.password,
          //zahlungsmethode: user.zahlungsmethode

         // id: 100,
         // name: user.name,                       // TODO: name rausnehmen
          //email: user.email.toLowerCase(),
         // password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          addressId: user.addressId,
          methodOfPayment: user.methodOfPayment,
          cartId: user.cartId,
          stockpileId: user.stockpileId

        }
      )
      this.updateUsersInLocalStorage();
      this.usersUpdate.next(this.users);
    } else {
      console.warn('Benutzer schon vorhanden!')
    }    
  } */

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
          const user = response.user;
          this.currentUser = user;
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
          const user = response.user;
          this.currentUser = user;
          this.userLoggedIn.next(true);
        })
    );
  }

  logout() {
    this.userLoggedIn.next(false);
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
