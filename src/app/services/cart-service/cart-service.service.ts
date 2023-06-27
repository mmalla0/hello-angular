/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/shared/cart-item';
import { Item } from 'src/app/shared/item';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItems: CartItem[] = [];
  cartItemsChange: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);

  constructor() {}

  /**
   *
   * @param itemToAdd
   */
  addItem(itemToAdd: Item) {
    const itemIndexInCart: number = this.cartItems.findIndex(
      (cartItem: CartItem) => cartItem.itemId === itemToAdd.id
    );

    if (itemIndexInCart === -1) {
      const item: CartItem = {
        itemId: itemToAdd.id,
      //  description: itemToAdd.description,
        quantity: 1,
        name: itemToAdd.name,
        price: itemToAdd.price,
      };
      this.cartItems.push(item);
    } else {
      const elementToUpdate = this.cartItems[itemIndexInCart];
      const newItemToAdd: CartItem = {
        ...elementToUpdate,
        quantity: elementToUpdate.quantity + 1,
        price: (elementToUpdate.quantity + 1) * elementToUpdate.price,
      };
      this.cartItems.splice(itemIndexInCart, 1, newItemToAdd);
    }

    this.cartItemsChange.next(this.cartItems);
  }

  /**
   *
   * @param itemIdToRemove
   */
  removeItem(itemIdToRemove: number) {
    const itemIndex = this.cartItems.findIndex(
      (item: CartItem) => item.itemId === itemIdToRemove
    );

    this.cartItems.splice(itemIndex, 1);
    this.cartItemsChange.next(this.cartItems);
  }

  /**
   *
   */
  emptyCart() {
    this.cartItems = [];
    this.cartItemsChange.next(this.cartItems);
  }

  /**
   *
   * @param cartItemToReduce
   */
  decreaseItemQuantity(cartItemToReduce: CartItem) {
    const itemToDecrease: CartItem = this.cartItems.find(
      (item: CartItem) => item.itemId === cartItemToReduce.itemId
    );

    const itemIndexToUpdate: number = this.cartItems.findIndex(
      (item: CartItem) => item.itemId === cartItemToReduce.itemId
    );

    const newItemToDecrease: CartItem = {
      ...itemToDecrease,
      quantity: itemToDecrease.quantity - 1,
    };

    if (newItemToDecrease.quantity === 0) {
      this.removeItem(cartItemToReduce.itemId);
    } else {
      this.cartItems.splice(itemIndexToUpdate, 1, newItemToDecrease);
    }
    this.cartItemsChange.next(this.cartItems);
  }

  /**
   *
   * @param cartItemToIncrease
   */
  increaseItemQuantity(cartItemToIncrease: CartItem) {
    const itemToDecrease: CartItem = this.cartItems.find(
      (item: CartItem) => item.itemId === cartItemToIncrease.itemId
    );

    const itemIndexToUpdate: number = this.cartItems.findIndex(
      (item: CartItem) => item.itemId === cartItemToIncrease.itemId
    );

    const newItemToDecrease: CartItem = {
      ...itemToDecrease,
      quantity: itemToDecrease.quantity + 1,
    };

    this.cartItems.splice(itemIndexToUpdate, 1, newItemToDecrease);
    this.cartItemsChange.next(this.cartItems);
  }
}
