import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/shared/cart-item';
import { Item } from 'src/app/shared/item';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartItems: CartItem[] = [];
  cartItemsChange: BehaviorSubject<CartItem[]>= new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  addItem(itemToAdd: Item) {

  
    
    const itemIndexInCart: number = this.cartItems.findIndex((cartItem: CartItem) => cartItem.itemId === itemToAdd.id);

    if (itemIndexInCart === -1){
const item: CartItem = {
  itemId: itemToAdd.id,
  description: itemToAdd.description,
  quantity: 1,
  name: itemToAdd.name,
  price: itemToAdd.price
};
this.cartItems.push(item);
    } else {
      const elementToUpdate = this.cartItems[itemIndexInCart];
      const newItemToAdd: CartItem = {...elementToUpdate, quantity: elementToUpdate.quantity + 1, price:(elementToUpdate.quantity +1 )* elementToUpdate.price}
      this.cartItems.splice(itemIndexInCart, 1, newItemToAdd);
    }

      
    this.cartItemsChange.next(this.cartItems);
  
  }
}
