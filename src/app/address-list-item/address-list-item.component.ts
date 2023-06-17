import { Component, Input } from '@angular/core';
import { Address } from '../shared/address';

@Component({
  selector: 'app-address-list-item',
  templateUrl: './address-list-item.component.html',
  styleUrls: ['./address-list-item.component.css']
})
export class AddressListItemComponent {
  @Input() address?: Address;               // ? bedeuted optional
}
