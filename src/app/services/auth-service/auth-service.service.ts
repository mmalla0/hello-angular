import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export enum Zahlungsmethode {
  PAYPAL = 'paypal',
  KREDITKARTE = 'kreditkarte',
  DEBITKARTE = 'debitkarte',
  APPLEPAY = 'applepay'
};

export interface UserModel {
  id?: number,
  name?: string,
  email: string,
  password: string,
  zahlungsmethode?: Zahlungsmethode
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: UserModel[] = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'adminPassword123!',
      zahlungsmethode: Zahlungsmethode.KREDITKARTE
    },
    {
      id: 2,
      name: 'Maya Malla',
      email: 'maya@gmail.com',
      password: 'mayapassword!',
      zahlungsmethode: Zahlungsmethode.APPLEPAY
    }
  ];

  usersUpdate: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);
  userLoggedIn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

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
            
      const lastUserId: number = this.users[this.users.length - 1].id;

      console.log(lastUserId + 1, '>===== id to addd');
      
      this.users.push(
        {
          id: lastUserId + 1 ,
          name: user.name,
          email: user.email.toLowerCase(),
          password: user.password,
          zahlungsmethode: user.zahlungsmethode
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
}
