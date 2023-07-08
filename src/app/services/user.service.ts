import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
}
