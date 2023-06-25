import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';

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

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private users: UserModel[] = [
    {
      id: 1,
      name: 'Admin',                       // TODO: name rausnehmen
      email: 'admin@admin.com',
      password: 'adminPassword123!',
      firstName: 'Ad',
      lastName: 'min',
      addressId: 1,
      methodOfPayment: 'Cash',
      cartId: 1,
      stockpileId: 1
    },
    {
      id: 2,
      name: 'Maya Malla',                 // TODO: name rausnehmen
      email: 'maya@gmail.com',
      password: 'mayapassword!',
      firstName: 'Maya',
      lastName: 'Malla',
      addressId: 2,
      methodOfPayment: 'Cash',
      cartId: 2,
      stockpileId: 2
    }
  ];
  private currentUser: User | null = null;  
  
  usersUpdate: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);

  userLoggedIn: Subject<boolean>= new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient){}
  
  updateUsersInLocalStorage(){
    const usersToSave = this.users.map((user: UserModel)=>{
      return JSON.stringify(user)
    });
    localStorage.setItem('users', usersToSave.toString());
  }

  register (user: UserModel) {
    const userEmail = user.email.toLowerCase();

    const userIndex = this.users.findIndex((user: UserModel) => user.email === userEmail);

    if (userIndex === -1) {
      this.users.push(
        {
          id: 100,
          name: user.name,                       // TODO: name rausnehmen
          email: user.email.toLowerCase(),
          password: user.password,
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

  login (user: UserModel){
    const userEmail = user.email.toLowerCase();

    const userIndex = this.users.findIndex((user: UserModel) => user.email === userEmail);
  
    if (userIndex !== -1){
      const userInfoInDb = this.users[userIndex];
      if (user.password === userInfoInDb.password){
        console.info('Erfolgreich angemeldet!');
        this.userLoggedIn.next(true);
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
