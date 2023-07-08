import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockpileItem } from '../shared/user';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../shared/item';

@Injectable({
  providedIn: 'root'
})

export class StockpileService {

  http: HttpClient;

  constructor(private userService: UserService) { }

  getStockpileItems(customerId: number): Observable<StockpileItem[]> {
    const url = `/getStockpileByCustomerID/${customerId}`;
    return this.http.get<StockpileItem[]>(url);
  }

  deleteStockpileItem(stockpileItemId: string): Observable<void> {
    const url = `/deleteStockpileItem/${stockpileItemId}`;
    return this.http.delete<void>(url);
  }

  updateUserStockpile(stockpileId: number, items: Item[]): Observable<void> {
    const url = `/updateUserStockpile/${stockpileId}`;
    return this.http.post<void>(url, items); 
  }

}
