import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockpileItem } from 'src/app/stockpile-item.component';

@Component({
  selector: 'app-stockpile-list',
  templateUrl: './stockpile-list.component.html',
  styleUrls: ['./stockpile-list.component.css']
})
export class StockpileListComponent implements OnInit {
  stockpileItems: StockpileItem[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadStockpileItems();
  }

  loadStockpileItems() {
    this.userService.getStockpile().subscribe(items => {
      this.stockpileItems = items;
    });
  }
}

