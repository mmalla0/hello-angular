import { Component, Input } from '@angular/core';
import { StockpileItem } from 'src/app/shared/user';

@Component({
  selector: 'app-stockpile-item',
  templateUrl: './stockpile-item.component.html',
  styleUrls: ['./stockpile-item.component.css']
})
export class StockpileItemComponent {
  @Input() item: StockpileItem;
}

