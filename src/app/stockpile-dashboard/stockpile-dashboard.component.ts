import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockpileService } from 'src/app/services/stockpile.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../shared/user'; 
import { StockpileItem, StockpileItemEntry  } from '../shared/user';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-stockpile-dashboard',
  templateUrl: './stockpile-dashboard.component.html',
  styleUrls: ['./stockpile-dashboard.component.css']
})
export class StockpileDashboardComponent implements OnInit {
  stockpileItemEntries: StockpileItemEntry[];
  stockpileItems: StockpileItem[];
  currentUser: User | null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private stockpileService: StockpileService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.loadStockpileItems();
  }

  loadStockpileItems() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.stockpileService.getStockpileItems(this.currentUser.stockpileId).subscribe(items => {
        this.stockpileItemEntries = this.groupItemsByProduct(items);
        this.checkItemsForEmail(this.stockpileItemEntries);
      });
    }
  }

  groupItemsByProduct(items: StockpileItem[]): StockpileItemEntry[] {
    const itemEntries: StockpileItemEntry[] = [];
  
    items.forEach(item => {
      const existingEntry = itemEntries.find(entry => entry.product.id === item.id);
      if (existingEntry) {
        const existingBestBeforeDate = existingEntry.bestBeforeDates.find(date => date.date.getTime() === item.bestBeforeDate.getTime());
        if (existingBestBeforeDate) {
          existingBestBeforeDate.count += 1;
        } else {
          existingEntry.bestBeforeDates.push({ date: new Date(item.bestBeforeDate), count: 1 });
        }
      } else {
        const newEntry: StockpileItemEntry = {
          product: item,
          bestBeforeDates: [{ date: new Date(item.bestBeforeDate), count: 1 }]
        };
        itemEntries.push(newEntry);
      }
    });
  
    return itemEntries;
  }
  


  checkItemsForEmail(itemEntries: StockpileItemEntry[]) {
    const today = new Date();

    itemEntries.forEach(entry => {
      const { product, bestBeforeDates } = entry;
      
      bestBeforeDates.forEach(entryDate => {
        const daysRemaining = Math.floor((entryDate.date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
        if (daysRemaining === 7) {
          const emailText = `Attention: Consume the item "${product.name}" within 7 days!`;
          const recipient = 'recipient@example.com'; // Geben Sie hier die tatsächliche E-Mail-Adresse des Empfängers an
          this.emailService.sendEmail('Attention: Consume Item', emailText, recipient);
        }
      });
    });
  }
}
