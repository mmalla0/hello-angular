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
    orderItems: [],
    //items: [], Felinas VErsion
    address: null,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  };

  user: User | null = null;
  userAddress: string | undefined;

/* Katharinas Version
  constructor(
    private authService: AuthService,
    private userService: UserService 
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.invoice.methodOfPayment = this.user.methodOfPayment;
    }
  }

  getUserAddress()  {
    if (this.user) {
      console.log('User addressId:', this.user.addressId);
      this.userService.getAddressById(this.user.addressId).subscribe({
        next: (address: string) => {
          this.userAddress = address;
        },
        error: (error: any) => {
          console.error('Error retrieving user address:', error);
        }
      });
    }
*/
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
