import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../services/item-service/item.service';
import { WebsocketService } from '../../app/websocket.service';

@Component({
  selector: 'app-mitarbeiter-dashboard',
  templateUrl: './mitarbeiter-dashboard.component.html',
  styleUrls: ['./mitarbeiter-dashboard.component.css', './mitarbeiter-dashboard-table.css', '../../global-styles.css']
})

export class MitarbeiterDashboardComponent implements OnInit{
  sortColumn = 'name';
  showItemForm = false;
  showCategoryForm = false; 
  selectedProduct: Item;
  products: Item[];
  sortDirection = 1;
  searchQuery: string;

  constructor(private itemService: ItemService, private websocketService: WebsocketService) { }

  ngOnInit() {
    this.getItemsFromDataBase();
    this.listenToWebSocket();
  }

  getItemsFromDataBase(){
    this.itemService.getAllItems().subscribe({
      next: items => {
        items.sort((a, b) => a.item_name.localeCompare(b.item_name));
        this.products = items;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  private listenToWebSocket(): void {
    this.websocketService.connect().subscribe(() => {
      this.websocketService.subscribeToItemChanges().subscribe(() => {
        this.getItemsFromDataBase();
      });
    });
  }

  toggleSortOrder() {
    this.sortDirection = -this.sortDirection;
  }

  sortItemsByPrice() {
    this.products.sort((a, b) => (a.item_price - b.item_price) * this.sortDirection);
  }

  sortItemsByBestBefore() {
    this.products.sort((a, b) => {
      const dateA = new Date(a.best_before).getTime();
      const dateB = new Date(b.best_before).getTime();
      return (dateA - dateB) * this.sortDirection;
    });
  }

  sortItems(column: string) {
    this.sortDirection = this.sortDirection === 1 ? -1 : 1;
  
    this.products.sort((a, b) => {
      const valueA = column === 'price' ? a.item_price : column === 'best_before' ? new Date(a.best_before).getTime() : a.item_name.toLowerCase();
      const valueB = column === 'price' ? b.item_price : column === 'best_before' ? new Date(b.best_before).getTime() : b.item_name.toLowerCase();
  
      if (valueA < valueB) {
        return this.sortDirection === 1 ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 1 ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.products = [...this.products];
  }
  
  formatDate(dateString: string): string {
    if (!dateString || dateString.trim() === '') {
      return "-"; 
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return`${day}.${month}.${year}`;
  }
  
  getSortIcon(fieldName: string) {
    return {
      'fa-sort': true,
      'fa-sort-asc-item': fieldName === 'item_name' && this.sortDirection === 1,
      'fa-sort-desc-item': fieldName === 'item_name' && this.sortDirection === -1,
      'fa-sort-asc-price': fieldName === 'price' && this.sortDirection === 1,
      'fa-sort-desc-price': fieldName === 'price' && this.sortDirection === -1,
      'fa-sort-asc-best-before': fieldName === 'best_before' && this.sortDirection === 1,
      'fa-sort-desc-best-before': fieldName === 'best_before' && this.sortDirection === -1
    };
  }
  onSearchProducts() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const keywords = this.searchQuery.toLowerCase().split(' ');
      this.products = this.products.filter(product => {
        const itemName = product.item_name.toLowerCase();
        return keywords.every(keyword => itemName.includes(keyword));
      });
    } else {
      this.getItemsFromDataBase();
    }
  }

  editItemClicked(product: Item) {
    this.selectedProduct = { ...product };
    this.showItemForm = true;
  }

  deleteItem(product: Item) {
    this.itemService.deleteItem(product.item_ID);
    setTimeout(() => {
      this.getItemsFromDataBase();
    }, 1000);
  }

  showProductForm() {
    this.showCategoryForm = false; 
    this.showItemForm = true;
    this.selectedProduct = null;
  }

  hideProductForm() {
    this.showItemForm = false;
    this.selectedProduct = null;
  }

  showCategory(){
    this.showItemForm = false; 
    this.showCategoryForm = true; 
  }

  hideCategory(){
    this.showCategoryForm = false; 
  }

  saveProduct(product: Item) {
    product.employee_id = 1;

    if(product.item_ID == 0){
      this.itemService.addItem(product);
    } else {
      this.itemService.updateItem(product);
    }
    this.hideProductForm();
    setTimeout(() => {
      this.getItemsFromDataBase();
    }, 1000);
  }
}
