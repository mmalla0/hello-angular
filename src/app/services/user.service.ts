import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getStockpileId(): Observable<number> {
    const userId = this.authService.getCurrentUser().id; // Hier wird die userID des aktuellen Benutzers geholt
    const url = `/users/${userId}/stockpile`;
    return this.http.get<number>(url);
  }

  getEmailAddress(){
    return String(this.authService.getCurrentUser().email);
  }

  getAddressById(addressId: number): Observable<string> {
    const url = `/address/${addressId}`;
    return this.http.get<string>(url);
  }
}
