import { Component } from '@angular/core';
import { Invoice } from '../shared/invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderConfirmation: string;

  handleOrderCompleted(invoice: Invoice) {
    // Aktionen ausführen, wenn eine Bestellung abgeschlossen wurde
    this.orderConfirmation = 'Bestellung abgeschlossen! Vielen Dank!';
    console.log(invoice);
  }
}
