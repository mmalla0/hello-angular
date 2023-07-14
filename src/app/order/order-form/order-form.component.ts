import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Invoice } from 'src/app/shared/invoice';
import { Address } from 'src/app/shared/address';
import { AddressService } from 'src/app/services/address-service/address.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  invoice: Invoice = {
    id: 0,
    user: null,
    methodOfPayment: '',
    items: [],
    address: null,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  };

  user: User | null = null;

  constructor(private authService: AuthService,  private addressService: AddressService) {
    this.user = this.authService.currentUser;
  }

  ngOnInit() {
    this.getAddressById();
  }

  getAddressById() {
    this.addressService.getAddressById(this.authService.currentUser.id).subscribe(
      (address: Address) => {
        this.invoice.address = address;
      },
      (error) => {
        console.error('Failed to retrieve address:', error);
      }
    );
  }

  @Output() submitOrder = new EventEmitter<Invoice>();

  submitForm() {  
    this.submitOrder.emit(this.invoice);
  }
}
