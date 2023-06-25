import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockpileService } from 'src/app/services/stockpile.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/services/auth.service';
import { StockpileItem } from '../shared/user';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-stockpile-dashboard',
  templateUrl: './stockpile-dashboard.component.html',
  styleUrls: ['./stockpile-dashboard.component.css']
})
export class StockpileDashboardComponent implements OnInit {
  stockpileItems: StockpileItem[];
  currentUser: UserModel | null;

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
        this.stockpileItems = items;
        this.checkItemsForEmail(items);
      });
    }
  }

  checkItemsForEmail(items: StockpileItem[]) {
    const today = new Date();
  
    items.forEach(item => {
      const bestBeforeDate = new Date(item.bestBeforeDate);
  
      const daysRemaining = Math.floor((bestBeforeDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
      if (daysRemaining === 7) {
        const emailSubject = 'Attention: Consume Item';
        const emailText = `Attention: Consume the item "${item.name}" within 7 days!`;
          if (this.currentUser) {
            this.emailService.sendEmail(emailSubject, emailText, this.currentUser.email);
          }
      }
    });
  }
  
}
