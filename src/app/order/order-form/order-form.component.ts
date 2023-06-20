import { Component, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user';
import { Invoice } from 'src/app/shared/invoice';
import { PdfService } from 'src/app/services/pdf.service';
import { EmailService } from 'src/app/services/email.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {

  invoice: Invoice = {
    id: 0,
    userId: 0,
    methodOfPayment: ''
  }

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    addressId: 0,                
    methodOfPayment: '',
    cartId: 0,
    stockpileId: 0
  }

  @Output() submitOrder = new EventEmitter<Invoice>();

  constructor(
    private pdfService: PdfService,
    private emailService: EmailService,
    private databaseService: DatabaseService
  ) {}

  submitForm() {  
  // Schritt 1: Erstellung der Rechnung als PDF
  this.pdfService.createInvoicePDF(this.invoice).subscribe(pdfData => {
    // Schritt 2: Versenden der E-Mail mit der Rechnung als Anhang
    this.emailService.sendEmailWithAttachment('invoice@example.com', 'Rechnung', 'Siehe Anhang', pdfData).subscribe(() => {
      // Schritt 3: Aktualisierung des Warenbestands in der Datenbank
      this.updateStockpile();
    });
  });
  }
  updateStockpile() {
    // Hier sollte die Logik zum Aktualisieren des Warenbestands in der Datenbank implementiert werden
    // Verwenden Sie den this.user.stockpileId, um die entsprechende Warenbestand-Datensatz zu identifizieren
    // und aktualisieren Sie die entsprechenden Felder (z. B. reduceStock()).
    // Beispiel:
    this.databaseService.reduceStock(this.user.stockpileId, this.invoice.items).subscribe(() => {
       this.submitOrder.emit(this.invoice);
     });
  }
}
