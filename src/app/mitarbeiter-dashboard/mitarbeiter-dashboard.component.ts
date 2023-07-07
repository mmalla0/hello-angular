import { Component } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../services/item-service/item.service';

@Component({
  selector: 'app-mitarbeiter-dashboard',
  templateUrl: './mitarbeiter-dashboard.component.html',
  styleUrls: ['./mitarbeiter-dashboard.component.css']
})

export class MitarbeiterDashboardComponent {

  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  showForm: boolean = false;
  selectedProduct: Item;
  products: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItemsFromDataBase();
  }

  getItemsFromDataBase(){
    this.itemService.getAllItems().subscribe({
      next: items => {
        this.products = items;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  
  sortItems() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.products.sort((a, b) => {
      const nameA = a.item_name.toLowerCase();
      const nameB = b.item_name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.products = [...this.products];
  }

  formatDate(dateString: string): string {
    if (!dateString || dateString.trim() === '') {
      return null; // Return empty string if the date is empty or blank
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return`${year}-${month}-${day}`;
  }
  
  getSortIcon(column: string): string {
    if (column === this.sortColumn) {
      return this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }
    return 'fas fa-sort';
  }

  deleteItem(product: Item) {
    this.itemService.deleteItem(product.item_ID);
    this.getItemsFromDataBase();
  }

  decreaseQuantity(product: Item) {
    if (product.stock > 0) {
      product.stock--;
    }
  }

  increaseQuantity(product: Item) {
    product.stock++;
  }

  showProductForm() {
    this.showForm = true;
    this.selectedProduct = null;
  }

  hideProductForm() {
    this.showForm = false;
    this.selectedProduct = null;
  }

  saveProduct(product: Item) {
    product.employee_id = 1;
    this.itemService.addItem(product);
    this.hideProductForm();
    setTimeout(() => {
      this.getItemsFromDataBase();
    }, 1000);
  }

  editItem(product: Item) {
    this.selectedProduct = { ...product };
    this.showForm = true;
  }
}
