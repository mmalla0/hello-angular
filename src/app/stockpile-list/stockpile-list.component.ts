import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockpileService } from 'src/app/services/stockpile.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../shared/user';
import { StockpileItem } from '../shared/user';

@Component({
  selector: 'app-stockpile-list',
  templateUrl: './stockpile-list.component.html',
  styleUrls: ['./stockpile-list.component.css']
})
export class StockpileListComponent implements OnInit {
  stockpileItems: StockpileItem[];

  constructor(private userService: UserService, private authService: AuthService, private stockpileService: StockpileService) { }

  ngOnInit() {
    this.loadStockpileItems();
  }

  loadStockpileItems() {
    const currentUser: User | null = this.authService.getCurrentUser();
    if (currentUser) {
      this.stockpileService.getStockpileItems(currentUser.stockpileId).subscribe(items => {
        this.stockpileItems = items;
      });
    }
  }
}


