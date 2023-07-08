import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/item';
import { ItemService } from '../services/item-service/item.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  animations: [
  
  ]
})

export class ItemDetailsComponent implements OnInit {
  item: Item;

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = +params['id']; // Convert the string ID to a number
      this.itemService.getItem(itemId).subscribe(item => {
        this.item = item;
      });
    });
  }
}
