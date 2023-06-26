import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockpileItem } from '../shared/user';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StockpileService {
  apiUrl = 'http://localhost:8080';
  http: HttpClient;

  constructor(private userService: UserService) { }

  getStockpileItems(stockpileId: number): Observable<StockpileItem[]> {
    const url = `${this.apiUrl}/stockpile/${stockpileId}/items`;
    return this.http.get<StockpileItem[]>(url);
  }
}
