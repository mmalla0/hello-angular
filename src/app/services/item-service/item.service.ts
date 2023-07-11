import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Item } from '../../shared/item';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private webSocketSubject: WebSocketSubject<any>;

  private itemsURL = 'http://localhost:8080/landing'; 
  private itemUpdated: Subject<Item> = new Subject<Item>();

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.webSocketSubject = webSocket('ws://localhost:8080/');
    this.webSocketSubject.subscribe(
    (message) => {
      console.log('Received WebSocket message:', message);
      // Handle the received message if needed
    },
    (error) => {
      console.error('WebSocket connection error:', error);
    },
    () => {
      console.log('WebSocket connection closed');
    }
  );
  }
  

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsURL);
  }

  getItemsById(id: number): Observable<Item> {
    const url = `$/items/${id}`; 
    return this.http.get<Item>(url);
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

  reduceStock(items: Item[]): Observable<void> {
    const url = `$/reduceStock`;
    return this.http.post<void>(url, items); 
  }

  private getItemURL = 'getitem';
  
  getItem(itemId: number): Observable<Item> {
    const url = `${this.getItemURL}/${itemId}`;

    return this.http.get<Item>(url).pipe(
      catchError((error: any) => {
        console.error('Error retrieving item:', error);
        return throwError(() => new Error('Error retrieving item'));
      })
    );
  }
  
  sendItemListChanges(): void {
    console.log('Entered send item list changes'); // Add this log statement
    const event = 'itemListChanges';
    this.webSocketSubject.next({ event });
    console.log('Sent message: itemListChanges'); // Add this log statement
  }


  private editItemURL = '/editItem';
  editItem(item: Item): Observable<void> {
    console.log("Edit item function reached");
    console.log(item.item_name);
    return this.http.put<void>(this.editItemURL, item);
  }

  private showSuccessNotification(): void {
    this.toastr.success('Item edited successfully', 'Success');
  }

  private showErrorNotification(error: any): void {
    this.toastr.error('Failed to edit item', 'Error');
  }

  updateItem(item: Item): void {
    this.editItem(item).subscribe(
      () => {
        this.showSuccessNotification();
        this.getItem(item.item_ID).subscribe(
          (updatedItem: Item) => {
            this.itemUpdated.next(updatedItem); // Emit the updated item
          },
          (error) => {
            this.showErrorNotification(error);
          }
        );
      },
      (error) => {
        this.showErrorNotification(error);
      }
    );
  }

  getItemUpdated(): Observable<Item> {
    return this.itemUpdated.asObservable();
  }
}





