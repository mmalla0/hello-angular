import { Component } from '@angular/core';
import { ItemService } from './services/item-service/item.service';
import { Item } from './shared/item';

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
      <button (click)="testAddItem()">Add Item</button>
      <p *ngIf="addItemResult">{{ addItemResult }}</p>
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
        item_imgpath: ''
    };
    deleteItemId: number = 0;

    getAllItemsResult: Item[] | undefined;
    addItemResult: string | undefined;
    deleteItemResult: string | undefined;

    constructor(private itemService: ItemService) { }

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
        this.itemService.addItem(this.newItem);
        this.addItemResult = 'Item added successfully';

        // Clear the input fields
        this.newItem = {
            item_name: '',
            item_description: '',
            item_price: 0,
            stock: 0,
            employee_id: 0,
            best_before: '',
            item_imgpath: ''
        };
    }

    testDeleteItem(): void {
        this.itemService.deleteItem(this.deleteItemId);
        this.deleteItemResult = 'Item deleted successfully';

        // Clear the input field
        this.deleteItemId = 0;
    }
}