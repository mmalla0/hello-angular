import { Component, Input } from '@angular/core';
import { Item } from '../shared/item';

@Component({
  selector: 'app-stockpile-item',
  templateUrl: './stockpile-item.component.html',
  styleUrls: ['./stockpile-item.component.css']
})
export class StockpileItemComponent {
  @Input() item: Item;
}

