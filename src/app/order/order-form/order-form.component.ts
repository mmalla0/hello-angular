import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  @Output() submitOrder = new EventEmitter<Invoice>();

  submitForm() {  
  this.submitOrder.emit(this.invoice);
  }
}
