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


  private additemURL = 'additem';
  addItem(item: any): void {
    this.http.post(this.additemURL, item).subscribe(
      (response) => {
        // Handle success response
        console.log('Item added successfully');
      },
      (error) => {
        // Handle error
        console.error('Error adding item:', error);
      }
    );
  }


  private deleteItemURL = 'deleteitem';

  deleteItem(itemId: number): void {
    const url = `${this.deleteItemURL}/${itemId}`;

    this.http.delete(url).subscribe(
      (response) => {
        // Handle success response
        console.log('Item deleted successfully');
      },
      (error) => {
        // Handle error
        console.error('Error deleting item:', error);
      }
    );
  }

}



