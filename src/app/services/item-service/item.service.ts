import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../shared/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsURL = 'http://localhost:8080/landing'; 

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsURL);
  }
}

