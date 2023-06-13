import { Component } from '@angular/core';
import { Address } from '../shared/address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent {
 addresses: Address[] = []

 constructor() {
  this.addresses = [
    {
      id: 0,
      street: 'Milky Way',
      houseNumber: 785,
      postalCode: 28560,
      city: 'Kulass',
      country: 'Xla',
      planet: 'Hirlpo'
    },
    {
      id: 1,
      street: 'My Way',
      houseNumber: 66687,
      postalCode: 97856,
      city: 'Kulass',
      country: 'Xla',
      planet: 'Hirlpo'
    }
  ];
 }
}
