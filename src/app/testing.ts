import { Component } from '@angular/core';
import { ItemService } from 'services/item.service';
import { Item } from 'shared/item';

@Component({
    selector: 'app-tester',
    template: `
    <h2>Item Tester</h2>

    <button (click)="testGetAllItems()">Test Get All Items</button>
    <p *ngIf="getAllItemsResult">{{ getAllItemsResult | json }}</p>

    <button (click)="testAddItem()">Test Add Item</button>
    <p *ngIf="addItemResult">{{ addItemResult }}</p>

    <button (click)="testDeleteItem()">Test Delete Item</button>
    <p *ngIf="deleteItemResult">{{ deleteItemResult }}</p>
  `
})
export class TesterComponent {
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
        const newItem: any = {
            // Define properties for the new item
            item_name: 'New Item',
            item_description: 'New Item Description',
            item_price: 10.99,
            stock: 10,
            employee_id: 1,
            best_before: '2023-07-05',
            item_imgpath: 'new-item.jpg'
        };

        this.itemService.addItem(newItem);
        this.addItemResult = 'Item added successfully';
    }

    testDeleteItem(): void {
        const itemId = 1; // Provide an existing item ID to delete

        this.itemService.deleteItem(itemId);
        this.deleteItemResult = 'Item deleted successfully';
    }
}