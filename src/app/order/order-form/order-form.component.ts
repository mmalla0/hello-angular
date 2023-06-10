import { Component } from '@angular/core';
import { Address } from 'src/app/shared/address';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  address: Address = {
    id: null,
    street: '',
    houseNumber: 0,
    postalCode: 0,
    city: '',
    country: '',
    planet: '',
  }
  user: User = {
    id: null,
    firstName: '',
    lastName: '',
    addressId: this.address.id,                 //TODO: hier die addressID der eben angelegten Adresse holen
    methodOfPayment: '',
    cartId: null,
    stockpileId: null,
  }

}
