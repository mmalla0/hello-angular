import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/item';
import { ItemService } from '../services/item-service/item.service';
import { AuthService } from '../services/auth-service/auth.service';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css', '../../global-styles.css'],
  animations: [
  
  ]
})

export class ItemDetailsComponent implements OnInit {
  item: Item;
  showItemForm = false;
  showCategoryForm = false; 
  isLoggedIn: boolean = false;
  selectedItems: Item[] = [];

  constructor(private route: ActivatedRoute, 
    private itemService: ItemService, 
    private router: Router, 
    public authService: AuthService, 
    public cartService: CartServiceService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    })

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
    console.log("Function saveNewItem reached!");
    console.log(itemToBeEdited.item_description);

    itemToBeEdited.employee_id = this.authService.currentUser.employee_id;

    this.itemService.updateItem(itemToBeEdited);

    this.itemService.getItemUpdated().subscribe(
      (updatedItem: Item) => {
        this.item = updatedItem;
        this.hideProductForm();
        this.router.navigate(['items', updatedItem.item_ID]);
      },
      (error) => {
        console.error("Error updating item:", error);
      }
    );
  }


  deleteItem() {
    this.itemService.deleteItem(this.item.item_ID);
    
  }

  hideProductForm() {
    this.showItemForm = false;
  }

  onAddToCart(product: Item): void {
    this.selectedItems.push(product);
    this.cartService.addItem(product);
    this.toastr.success(product.item_name + ' has been added to cart.');
  }

}
