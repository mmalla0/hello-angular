import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockpileItem } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getStockpile(): Observable<StockpileItem[]> {
    const userId = '123'; // Replace with the actual user ID
    const url = `${this.apiUrl}/users/${userId}/stockpile`;
    return this.http.get<StockpileItem[]>(url);
  }
}
