import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Invoice } from 'src/app/shared/invoice';
import { Address } from 'src/app/shared/address';
import { AddressService } from 'src/app/services/address-service/address.service';
import { User } from 'src/app/shared/user';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})

export class OrderFormComponent implements OnInit{
  invoice: Invoice = {
    id: 0,
    user: null,
    methodOfPayment: '',
    orderItems: [],
    address: null,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  };
  user: User | null = null;
  userAddress: string | undefined;

  constructor(private authService: AuthService,  
    private addressService: AddressService,  
    private cartService: CartServiceService) {
    this.user = this.authService.currentUser;
  }

  @Output() formSubmitted = new EventEmitter<Invoice>();

 /** Implements OnInit lifecycle hook */
  ngOnInit() {
    this.getAddressById();
  }

  submitForm() {  
    this.formSubmitted.emit(this.invoice);
  }

  getAddressById() {
    this.addressService.getAddressById(this.authService.currentUser.id).subscribe({
      next: (address: Address) => {
        this.invoice.address = address;
      },
      error: (error: unknown) => {
        console.error('Failed to retrieve address:', error);
      }
    });
  }

  @Output() submitOrder = new EventEmitter<Invoice>();
  
}
