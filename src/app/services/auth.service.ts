import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export enum Zahlungsmethode {
  PAYPAL = 'paypal',
  KREDITKARTE = 'kreditkarte',
  DEBITKARTE = 'debitkarte',
  APPLEPAY = 'applepay'
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
/*
export interface UserModel {   
  id: number;
  name?: string;                           // TODO: name rausnehmen
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  addressId: number;
  methodOfPayment: string;
  cartId: number;
  stockpileId: number;

}
*/

@Injectable({
  providedIn: 'root'
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
      stockpileId: 1

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
      stockpileId: 2

    }
  ];
  private currentUser: User | null = null;  
  
  usersUpdate: Subject<User[]> = new BehaviorSubject<User[]>(this.users);

  userLoggedIn: Subject<boolean>= new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router){}
  
  
  updateUsersInLocalStorage(){
    const usersToSave = this.users.map((user: User)=>{
      return JSON.stringify(user)
    });
    localStorage.setItem('users', usersToSave.toString());
  }

  register (user: User) {
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
  }

  login (user: User){
    const userEmail = user.email.toLowerCase();

    const userIndex = this.users.findIndex((user: User) => user.email === userEmail);
  
    if (userIndex !== -1){
      const userInfoInDb = this.users[userIndex];
      if (user.password === userInfoInDb.password){
        console.info('Erfolgreich angemeldet!');
        this.userLoggedIn.next(true);

        this.router.navigate(['/landing']);

        this.currentUser = userInfoInDb; //  Setze den aktuellen Benutzer auf den angemeldeten Benutzer

      } else {
        console.warn('Anmeldung fehlgeschlagen!')
      }
    } else {
      console.warn('Anmeldung fehlgeschlagen!')
    }
  }

  logout (){
    this.userLoggedIn.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUser; 
  }
}
