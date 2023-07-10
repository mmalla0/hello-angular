import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showItemForm = false;
  showCategoryForm = false; 

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = +params['id']; // Convert the string ID to a number
      this.itemService.getItem(itemId).subscribe(item => {
        this.item = item;
      });
    });
  }


  editCurrentItem() {
    this.showItemForm = true;
  }

  saveNewItem(itemToBeEdited: Item) {
    console.log("Function saveNewItem reached!")

    this.itemService.editItem(itemToBeEdited);

    this.itemService.getItemUpdated().subscribe((updatedItem: Item) => {
      // Handle the updated item
      // Update the view or perform other operations
      const routeUrl = `items/${updatedItem.item_ID}`;
      this.router.navigateByUrl(routeUrl);
    });

  }

  deleteItem() {
    this.itemService.deleteItem(this.item.item_ID);
    
  }

  hideProductForm() {
    this.showItemForm = false;
  }

}
