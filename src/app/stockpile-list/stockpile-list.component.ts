import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockpileService } from 'src/app/services/stockpile.service';
import { AuthService, UserModel } from 'src/app/services/auth.service';
import { StockpileItem } from '../shared/user';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-stockpile-list',
  templateUrl: './stockpile-list.component.html',
  styleUrls: ['./stockpile-list.component.css']
})
export class StockpileListComponent implements OnInit {
  stockpileItems: StockpileItem[];

  constructor(private userService: UserService, private authService: AuthService, private stockpileService: StockpileService, private emailService: EmailService) { }

  ngOnInit() {
    this.loadStockpileItems();
  }

  loadStockpileItems() {
    const currentUser: UserModel | null = this.authService.getCurrentUser();
    if (currentUser) {
      this.stockpileService.getStockpileItems(currentUser.stockpileId).subscribe(items => {
        this.stockpileItems = items;
      });
    }
  }

  getDaysRemaining(item: StockpileItem): number {
    const currentDate = new Date();
    const bestBeforeDate = new Date(item.bestBeforeDate);
    const timeDifference = bestBeforeDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysRemaining;
  }

}


