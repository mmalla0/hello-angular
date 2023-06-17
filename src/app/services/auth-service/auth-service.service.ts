import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface UserModel {
  id?: number,
  name?: string,
  email: string,
  password: string
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
      password: 'adminPassword123!'
    },
    {
      id: 2,
      name: 'Maya Malla',
      email: 'maya@gmail.com',
      password: 'mayapassword!'
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
      this.users.push(
        {
          id: 100,
          name: user.name,
          email: user.email.toLowerCase(),
          password: user.password
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
