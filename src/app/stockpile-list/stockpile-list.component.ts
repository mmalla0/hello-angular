import { Component, OnInit } from '@angular/core';
import { StockpileService } from 'src/app/services/stockpile.service';
import { AuthService } from 'src/app/services/auth.service';
import { StockpileItem } from '../shared/user';
import { User } from '../shared/user';
import { StockpileItemEntry } from '../shared/stockpile-item-entry';

@Component({
  selector: 'app-stockpile-list',
  templateUrl: './stockpile-list.component.html',
  styleUrls: ['./stockpile-list.component.css']
})
export class StockpileListComponent implements OnInit {
  stockpileItemEntries: StockpileItemEntry[] = [];
  stockpileItems: StockpileItem[];
  filterCategory: string;
  availableCategories: string[] = ['Food', 'Health', 'Toys', 'Science', 'Electronics', 'Tools', 'Fashion', 'Art'];

  constructor(
    private authService: AuthService, 
    private stockpileService: StockpileService, 
  ) { }

  ngOnInit() {
    this.loadStockpileItems();
  }

  loadStockpileItems() {
    console.log("I am in loadStockpileItems");
    const currentUser: User | null = this.authService.getCurrentUser();
    console.log("The current user is: ", currentUser);
    if (currentUser) {
      console.log("Die Id des aktuellen users: ", currentUser.id)
      this.stockpileService.getStockpileItems(currentUser.id).subscribe(items => {
        console.log("The stockpile retrieved by customer id: ", this.stockpileService.getStockpileItems(currentUser.id));
        this.stockpileItems = items;
        this.stockpileItemEntries = this.groupItemsByProduct(items);
        this.sortStockpileItems();
        this.applyFilter(); 
      });
    }
  }

  groupItemsByProduct(items: StockpileItem[]): StockpileItemEntry[] {
    const itemEntries: StockpileItemEntry[] = [];
  
    items.forEach(item => {
      const existingEntry = itemEntries.find(entry => entry.product.id === item.id);
      if (existingEntry) {
        const existingBestBeforeDate = existingEntry.bestBeforeDates.find(date => date.date.getTime() === new Date(item.bestBeforeDate).getTime());
        if (existingBestBeforeDate) {
          existingBestBeforeDate.count += 1;
        } else {
          existingEntry.bestBeforeDates.push({ date: new Date(item.bestBeforeDate), count: 1 });
        }
      } else {
        const newEntry: StockpileItemEntry = {
          product: item,
          bestBeforeDates: [{ date: new Date(item.bestBeforeDate), count: 1 }],
          name: item.name
        };
        itemEntries.push(newEntry);
      }
    });
  
    return itemEntries;
  }

  groupItemsByCategory(items: StockpileItem[]): StockpileItemEntry[] {
    const itemEntries: StockpileItemEntry[] = [];
  
    items.forEach(item => {console.log("Haltbarkeitsdatum: ", item.bestBeforeDate);
      const existingEntry = itemEntries.find(entry => entry.product.category === item.category);
      if (existingEntry) {
        const existingItem = existingEntry.items.find(existingItem => existingItem.product.id === item.id);
        if (existingItem) {
          const existingBestBeforeDate = existingItem.bestBeforeDates.find(date => date.date.getTime() === new Date(item.bestBeforeDate).getTime());
          if (existingBestBeforeDate) {
            existingBestBeforeDate.count += 1;
          } else {
            existingItem.bestBeforeDates.push({ date: new Date(item.bestBeforeDate), count: 1 });
          }
        } else {
          const newItem: StockpileItem = {
            id: item.id,
            name: item.name,
            category: item.category,
            bestBeforeDate: item.bestBeforeDate,
            
            quantity: item.quantity,
            product: item.product // Ändern Sie 'products' in 'product'
          };
          existingEntry.items.push({
            product: newItem,
            bestBeforeDates: [{ date: new Date(newItem.bestBeforeDate), count: 1 }],
            name: newItem.name
          });
        }
      } else {
        const newEntry: StockpileItemEntry = {
          
          product: item,
          bestBeforeDates: [{ date: new Date(item.bestBeforeDate), count: 1 }],
          name: item.name,
          items: [{
            product: item,
            bestBeforeDates: [{ date: new Date(item.bestBeforeDate), count: 1 }],
            name: item.name
          }]
        };
        itemEntries.push(newEntry);
      }
    });
  
    return itemEntries;
  }
  
  applyFilter() {
    const categoryFilter = this.filterCategory ? this.filterCategory.toLowerCase() : '';
  
    this.stockpileItemEntries = this.groupItemsByCategory(this.stockpileItems);
  
    this.stockpileItemEntries = this.stockpileItemEntries.filter(entry => {
      const productCategory = entry.product.category.toLowerCase();
      return categoryFilter === '' || productCategory.includes(categoryFilter);
    });
  }

  clearFilters() {
    this.filterCategory = '';
    this.loadStockpileItems();
  }
  
  sortStockpileItems() {
    this.stockpileItems.sort((a, b) => {
      const dateA = new Date(a.bestBeforeDate).getTime();
      const dateB = new Date(b.bestBeforeDate).getTime();
      return dateA - dateB;
    });
    this.stockpileItemEntries = this.groupItemsByProduct(this.stockpileItems);
  }

  getDaysRemaining(item: StockpileItem): number {
    const currentDate = new Date();
    const bestBeforeDate = new Date(item.bestBeforeDate);
    const timeDifference = bestBeforeDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysRemaining;
  }

  deleteStockpileItem(item: StockpileItem) {
    this.stockpileService.deleteStockpileItem(item.id).subscribe((response) => {
      console.log(response);
      
      // Item erfolgreich gelöscht, lade Stockpile neu
      this.loadStockpileItems();
    });
    
  }

}


