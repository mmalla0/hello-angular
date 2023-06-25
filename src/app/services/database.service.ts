import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../shared/item';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  apiUrl = 'http://localhost:8080'; // Set the URL of server.js API

  constructor(private http: HttpClient) {}

  updateUserStockpile(stockpileId: number, items: Item[]): Observable<void> {
    const url = `${this.apiUrl}/updateUserStockpile/${stockpileId}`;
    return this.http.post<void>(url, items); 
  }
  
  reduceStock(items: Item[]): Observable<void> {
    const url = `${this.apiUrl}/reduceStock`;
    return this.http.post<void>(url, items); 
  }


  getItems(): Observable<Item[]> {
    const url = `${this.apiUrl}/items`; // Update the URL to your server.js API endpoint
    return this.http.get<Item[]>(url);
  }

  getItemsById(id: number): Observable<Item> {
    const url = `${this.apiUrl}/items/${id}`; // Update the URL to your server.js API endpoint
    return this.http.get<Item>(url);
  }
}
