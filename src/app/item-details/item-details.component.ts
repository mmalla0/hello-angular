import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = params['id']; // Assuming you have a route parameter named 'id' for item identification
      // Fetch item details using the itemId, e.g., make an API call or retrieve from a service
      // Assign the fetched item details to the 'item' property
    });
  }
}
