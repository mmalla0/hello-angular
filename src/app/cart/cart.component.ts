import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { CartItem } from '../shared/cart-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[];
  cartItemsSubscription: Subscription;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.cartItemsSubscription = this.cartService.cartItemsChange.subscribe(
      (newListOfCartItem: CartItem[]) => {
        this.cartItems = newListOfCartItem;
      }
    );
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }
}
