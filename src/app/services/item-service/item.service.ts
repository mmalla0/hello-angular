import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Item } from '../../shared/item';
import { CartItem } from 'src/app/shared/cart-item';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  private itemUpdated: Subject<Item> = new Subject<Item>();

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  
  private allItemsURL = 'landing'; 
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.allItemsURL);
  }

  getItemsById(id: number): Observable<Item> {
    const url = `$/items/${id}`; 
    return this.http.get<Item>(url);
  }
  
  private additemURL = 'additem';
  addItem(item: any): void {
    console.log(item);
    this.http.post(this.additemURL, item).subscribe(
      (response) => {
        // Handle success response
        this.toastr.success('Item successfully added.', 'Success');
        console.log('Item added successfully');
      },
      (error) => {
        // Handle error
        this.toastr.error('Failed to add item', 'Error');
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
        this.toastr.success('Item has been deleted', 'Success');
        console.log('Item deleted successfully');
      },
      (error) => {
        this.toastr.error('Failed to delete item', 'Error');
        console.error('Error deleting item:', error);
      }
    );
  }

  reduceStock(orderItems: CartItem[]): Observable<void> {
    const url = `/reduceStock`;
    console.log(orderItems);
    return this.http.post<void>(url, orderItems); 
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





