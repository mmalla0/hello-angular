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
  filterName: string;
  filterDate: Date;

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
        this.applyFilters(); 
        //this.groupStockpileItems();
      });
    }
  }

  /*
  groupStockpileItems() {
    this.stockpileItemEntries = [];
    this.stockpileItems.forEach(item => {
      const existingEntry = this.stockpileItemEntries.find(entry => entry.bestBeforeDates[0]?.date.getTime() === item.bestBeforeDate.getTime());
      if (existingEntry) {
        existingEntry.bestBeforeDates[0].count += 1;
      } else {
        this.stockpileItemEntries.push({
          product: item,
          bestBeforeDates: [{ date: new Date(item.bestBeforeDate), count: 1 }]
        });
      }
    });
  }*/

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

  applyFilters() {
    this.stockpileItems = this.stockpileItems.filter(item => {
      const nameMatch = !this.filterName || item.name.toLowerCase().includes(this.filterName.toLowerCase());
      const categoryMatch = !this.filterCategory || item.category.toLowerCase() === this.filterCategory.toLowerCase();
      const dateMatch = !this.filterDate || new Date(item.bestBeforeDate).toDateString() === this.filterDate.toDateString();
      return nameMatch && categoryMatch && dateMatch;
    });
  }
  
  clearFilters() {
    this.filterCategory = '';
    this.filterName = '';
    this.filterDate = null;
    this.loadStockpileItems();
  }

  getDaysRemaining(item: StockpileItem): number {
    const currentDate = new Date();
    const bestBeforeDate = new Date(item.bestBeforeDate);
    const timeDifference = bestBeforeDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysRemaining;
  }

  deleteStockpileItem(item: StockpileItem) {
    this.stockpileService.deleteStockpileItem(item.id).subscribe(() => {
      // Item erfolgreich gelöscht, lade Stockpile neu
      this.loadStockpileItems();
    });
  }

}


