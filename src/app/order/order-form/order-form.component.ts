import { Component, Output, EventEmitter } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  invoice: Invoice = {
    id: 0,
    user: undefined,
    methodOfPayment: '',
    items: [],
    address: undefined,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  }
  user: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    addressId: 0,                
    methodOfPayment: '',
    cartId: 0,
    stockpileId: 0 
  }
  @Output() submitOrder = new EventEmitter<Invoice>();

  submitForm() {  
  this.submitOrder.emit(this.invoice);
  }
}
