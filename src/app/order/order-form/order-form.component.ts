import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
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
    orderItems: [],
    address: undefined,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  }
  user: User | null = null;
  userAddress: string | undefined;

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
  }

  @Output() submitOrder = new EventEmitter<Invoice>();

  submitForm() {  
  this.submitOrder.emit(this.invoice);
  }


}
