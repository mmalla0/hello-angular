import { Component, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user';
import { Invoice } from 'src/app/shared/invoice';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {

  invoice: Invoice = {
    id: 0,
    userId: 0,
    methodOfPayment: ''
  }


  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    addressId: 0,                
    methodOfPayment: '',
    cartId: 0,
    stockpileId: 0
  }

  @Output() submitOrder = new EventEmitter<Invoice>();

  submitForm() {
    this.submitOrder.emit(this.invoice);  //soll die Rechnung als PDF erstellen und per EMail versenden
  }

}
