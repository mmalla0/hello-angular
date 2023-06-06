import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface UserModel {
  id?: number,
  name?: string,
  email: string,
  password: string
}

let users: UserModel[] = [
  {
      id: 1,
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'adminPassword123!'
  },
  {
      id: 2,
      name: 'Maya Malla',
      email: 'maya@gmail.com',
      password: 'mayapassword!'
  }
]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUpdate: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(users);
  userLoggedIn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  constructor() { };
  
  updateUsersInLocalStorage(){
    const usersToSave = users.map((user: UserModel)=>{
      return JSON.stringify(user)
    });
    localStorage.setItem('users', usersToSave.toString());
  }

  register (user: UserModel) {
    const userEmail = user.email.toLowerCase();

    const userIndex = users.findIndex((user: UserModel) => user.email === userEmail);

    if (userIndex === -1) {
      users.push(
        {
          id: 100,
          name: user.name,
          email: user.email.toLowerCase(),
          password: user.password
        }
      )
      this.updateUsersInLocalStorage();
      this.usersUpdate.next(users);
    } else {
      console.warn('Benutzer schon vorhanden!')
    }    
  }

  login (user: UserModel){
    const userEmail = user.email.toLowerCase();

    const userIndex = users.findIndex((user: UserModel) => user.email === userEmail);
  
    if (userIndex !== -1){
      const userInfoInDb = users[userIndex];
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
