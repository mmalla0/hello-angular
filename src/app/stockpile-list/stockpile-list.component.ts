import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockpileService } from 'src/app/services/stockpile.service';
import { AuthService } from 'src/app/services/auth.service';
import { StockpileItem, StockpileItemEntry } from '../shared/user';
import { EmailService } from '../services/email.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-stockpile-list',
  templateUrl: './stockpile-list.component.html',
  styleUrls: ['./stockpile-list.component.css']
})
export class StockpileListComponent implements OnInit {
  stockpileItems: StockpileItem[];
  stockpileItemEntries: StockpileItemEntry[] = [];
  filterCategory: string;
  filterName: string;
  filterDate: Date;

  constructor(private userService: UserService, private authService: AuthService, private stockpileService: StockpileService, private emailService: EmailService) { }

  ngOnInit() {
    this.loadStockpileItems();
  }

  
  loadStockpileItems() {
    const currentUser: User | null = this.authService.getCurrentUser();
    if (currentUser) {
      this.stockpileService.getStockpileItems(currentUser.id).subscribe(items => {
        this.stockpileItems = items;
        this.applyFilters(); 
        this.groupStockpileItems();
      });
    }
  }

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


