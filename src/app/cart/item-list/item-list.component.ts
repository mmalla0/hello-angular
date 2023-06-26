import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';
import { CartItem } from 'src/app/shared/cart-item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  @Input() items: CartItem[];

  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) {}

  removeItemFromCartClicked(itemIdToRemove: number) {
    this.cartService.removeItem(itemIdToRemove);
  }

  onDecreaseClicked(item: CartItem) {
    this.cartService.decreaseItemQuantity(item);
  }

  onIncreaseClicked(item: CartItem) {
    this.cartService.increaseItemQuantity(item);
  }

  emptyCartClicked() {
    this.cartService.emptyCart();
  }

  onPurchaseClicked() {
    // TODO add the path to the purchase formular
    // this.router.navigate([])
  }
}
