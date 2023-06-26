import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080';  

  constructor(private http: HttpClient, private authService: AuthService) { }

  getStockpileId(): Observable<number> {
    const userId = this.authService.getCurrentUser().id; // Hier wird die userID des aktuellen Benutzers geholt
    const url = `${this.apiUrl}/users/${userId}/stockpile`;
    return this.http.get<number>(url);
  }
}
