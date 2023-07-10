import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockpileItem } from '../shared/user';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../shared/invoice';

@Injectable({
  providedIn: 'root'
})

export class StockpileService {

  constructor(private userService: UserService, private http: HttpClient) { }

  getStockpileItems(customerId: number): Observable<StockpileItem[]> {
    const url = '/getStockpileByCustomerID/';
    return this.http.get<StockpileItem[]>(url + customerId);
  }

  deleteStockpileItem(stockpileItemId: string): Observable<void> {
    const url = '/deleteStockpileItem/';
    return this.http.delete<void>(url + stockpileItemId);
  }

  updateUserStockpile(stockpileId: number, orderItems: OrderItem[]): Observable<void> {
    const url = '/updateUserStockpile/';
    return this.http.post<void>(url + stockpileId, orderItems); 
  }

}
