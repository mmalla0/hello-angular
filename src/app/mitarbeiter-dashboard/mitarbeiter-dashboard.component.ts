import { Component } from '@angular/core';
import { Item } from '../shared/item';

@Component({
  selector: 'app-mitarbeiter-dashboard',
  templateUrl: './mitarbeiter-dashboard.component.html',
  styleUrls: ['./mitarbeiter-dashboard.component.css']
})
export class MitarbeiterDashboardComponent {

  products: Item[] = [
    { id: 1, name: '2X2Re Stone', price: 50000, bestBeforeDate: '02.01.2320', quantity: 3, picture: 'space_stone.jpeg', categories: ['Other', 'Art'] },
    { id: 2, name: 'X-Wing', price: 67658, bestBeforeDate: '-', quantity: 30, picture: 'x_wing.jpeg', categories: ['Equipment', 'Other'] },
    { id: 3, name: 'Spacetronics Starsuit', price: 200000, bestBeforeDate: '-', quantity: 11, picture: 'spacesuite.jpg', categories: ['Equipment', 'Fashion'] },
    { id: 4, name: 'VirtuCare Pets - CatBot Edition', price: 99.99, bestBeforeDate: '-', quantity: 30, picture: 'virtualpet_cat.jpg', categories: ['Art', 'Toys', 'Other'] },
    { id: 5, name: 'MediReady NanoBots', price: 5000.99, bestBeforeDate: '01.10.2300', quantity: 30, picture: 'healing_nanobots.jpg', categories: ['Health'] }
  ];
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  showForm: boolean = false;
  selectedProduct: Item;

  sortItems() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.products.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

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

  getSortIcon(column: string): string {
    if (column === this.sortColumn) {
      return this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }
    return 'fas fa-sort';
  }

  deleteItem(product: Item) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  decreaseQuantity(product: Item) {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  increaseQuantity(product: Item) {
    product.quantity++;
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
    if (product.id) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = { ...product }; 
      }
    } else {
      this.products.push({ ...product }); 
    }
  
    this.hideProductForm();
  }

  editItem(product: Item) {
    this.selectedProduct = { ...product };
    this.showForm = true;
  }
}
