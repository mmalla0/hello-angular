import { Component } from '@angular/core';
import { ItemService } from './services/item-service/item.service';
import { Item } from './shared/item';
import { StockpileService } from 'src/app/services/stockpile.service';
import { StockpileItem, StockpileItemEntry } from './shared/user';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tester',
    template: `
    <h2>Item Tester</h2>

    <div>
      <h3>Add Item</h3>
      <input type="text" [(ngModel)]="newItem.item_name" placeholder="Item Name" />
      <input type="text" [(ngModel)]="newItem.item_description" placeholder="Item Description" />
      <input type="number" [(ngModel)]="newItem.item_price" placeholder="Item Price" />
      <input type="number" [(ngModel)]="newItem.stock" placeholder="Stock" />
      <input type="number" [(ngModel)]="newItem.employee_id" placeholder="Employee ID" />
      <input type="date" [(ngModel)]="newItem.best_before" placeholder="Best Before" />
      <input type="text" [(ngModel)]="newItem.item_imgpath" placeholder="Image Path" />
      
      <p *ngIf="addItemResult">{{ addItemResult }}</p>

      <h4>Categories</h4>
        <label *ngFor="let category of categories">
            <input type="checkbox" [(ngModel)]="category.selected" /> {{ category.category_name }}
        </label>
        <button (click)="testAddItem()">Add Item</button>
    </div>

    <div>
      <h3>Delete Item</h3>
      <input type="number" [(ngModel)]="deleteItemId" placeholder="Item ID" />
      <button (click)="testDeleteItem()">Delete Item</button>
      <p *ngIf="deleteItemResult">{{ deleteItemResult }}</p>
    </div>

    <div>
      <h3>Get All Items</h3>
      <button (click)="testGetAllItems()">Get All Items</button>
      <p *ngIf="getAllItemsResult">{{ getAllItemsResult | json }}</p>
    </div>

    <div>
        <h3>Get Stockpile by Customer ID</h3>
        <input type="text" [(ngModel)]="customerID" placeholder="Customer ID" />
        <button (click)="testGetStockpileByCustomerID(customerID)">Get Stockpile</button>
        <pre *ngIf="stockpileItems">{{ stockpileItems | json }}</pre>
    </div>

    <div>
        <h3>Delete Stockpile Item</h3>
        <input type="text" [(ngModel)]="stockpileId" placeholder="Stockpile Item ID" />
        <button (click)="testDeleteStockpileItem(stockpileId)">Delete Stockpile Item</button>
        <p *ngIf="deleteMessage">{{ deleteMessage }}</p>
    </div>
  `
})
export class TesterComponent {


    newItem: any = {
        item_name: '',
        item_description: '',
        item_price: 0,
        stock: 0,
        employee_id: 0,
        best_before: '',
        item_imgpath: '',
        categories: []
    };
    deleteItemId: number = 0;

    getAllItemsResult: Item[] | undefined;
    addItemResult: string | undefined;
    deleteItemResult: string | undefined;

    categories: { category_name: string; selected: boolean }[] = [
        { category_name: 'Food', selected: false },
        { category_name: 'Science', selected: false },
        { category_name: 'Health', selected: false }
    ];


    customerID: string = '';
    stockpileId: string = '';
    stockpileItems: any[] | undefined;
    deleteMessage: string | undefined;

    constructor(private itemService: ItemService, private stockpileService: StockpileService, private http: HttpClient) { }

    testGetAllItems(): void {
        this.itemService.getAllItems().subscribe(
            (items) => {
                this.getAllItemsResult = items;
                console.log('Get All Items:', items);
            },
            (error) => {
                console.error('Error in Get All Items:', error);
            }
        );
    }

    testAddItem(): void {
        const selectedCategories = this.categories.filter(category => category.selected);
        console.log(selectedCategories);
        const categoryNames = selectedCategories.map(category => category.category_name);
        console.log(categoryNames);

        const newItem: any = {
            item_name: this.newItem.item_name,
            item_description: this.newItem.item_description,
            item_price: this.newItem.item_price,
            stock: this.newItem.stock,
            employee_id: this.newItem.employee_id,
            best_before: this.newItem.best_before,
            item_imgpath: this.newItem.item_imgpath,
            categories: categoryNames
        };

        console.log("These categories are added: " + newItem.categories);

        this.itemService.addItem(newItem);
        this.addItemResult = 'Item added successfully';

        // Clear the input fields
        this.newItem = {
            item_name: '',
            item_description: '',
            item_price: 0,
            stock: 0,
            employee_id: 0,
            best_before: '',
            item_imgpath: '',
            categories: []
        };
    }

    testDeleteItem(): void {
        this.itemService.deleteItem(this.deleteItemId);
        this.deleteItemResult = 'Item deleted successfully';

        // Clear the input field
        this.deleteItemId = 0;
    }

    testGetStockpileByCustomerID(customerID: string): void {
        this.http.get<StockpileItem[]>('/getStockpileByCustomerID/' + customerID).subscribe(
            (stockpile) => {
                this.stockpileItems = stockpile;
                console.log('Stockpile by Customer ID:', stockpile);
            },
            (error) => {
                console.error('Error retrieving stockpile by Customer ID:', error);
            }
        );
    }


    testDeleteStockpileItem(stockpileId: string): void {
        this.http.delete('/deleteStockpileItem/' + stockpileId).subscribe(
            () => {
                console.log('Stockpile item deleted successfully');
                this.deleteMessage = 'Stockpile item deleted successfully';
            },
            (error) => {
                console.error('Error deleting stockpile item:', error);
            }
        );
    }
}