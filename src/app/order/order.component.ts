import { Component } from '@angular/core';
import { Invoice } from '../shared/invoice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  constructor(private router: Router, private toastr: ToastrService){}

  handleOrderCompleted(invoice: Invoice) {
    // Aktionen ausführen, wenn eine Bestellung abgeschlossen wurde
    this.toastr.success('Order completed. Thank you very much!', 'Success');
    console.log(invoice);
    this.router.navigate(['/warenübersicht'])   
  }
}
