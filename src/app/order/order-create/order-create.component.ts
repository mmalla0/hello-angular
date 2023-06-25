import { Component, EventEmitter, Output } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice';
import { PdfService } from 'src/app/services/pdf.service';
import { EmailService } from 'src/app/services/email.service';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent {
  @Output() submitOrder = new EventEmitter<Invoice>();
  
  invoice: Invoice = {
    id: 0,
    user: undefined,
    methodOfPayment: '',
    items: [],
    address: undefined,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  };
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    addressId: 0,                
    methodOfPayment: '',
    cartId: 0,
    stockpileId: 0
  }
  orderConfirmation: string;

  constructor(
    private pdfService: PdfService,
    private emailService: EmailService,
    private databaseService: DatabaseService    
  ) {}

  handleFormSubmit(invoice: Invoice) {
    // Schritt 1: Erstellung der Rechnung als PDF
    this.pdfService.createInvoicePDF(invoice).subscribe((pdfData) => {
      // Schritt 2: Versenden der E-Mail mit der Rechnung als Anhang
      this.emailService
        .sendEmailWithAttachment('invoice@example.com', 'Rechnung', 'Siehe Anhang', pdfData)
        .subscribe(() => {
          // Schritt 3: Aktualisierung des Warenbestands in der Datenbank
          this.updateStock();
          //Schritt 4: Aktualisierung des persönlichen Stockpiles des Users
          this.updateUserStockpile();
        });
    });
  }

  updateStock() {
    
    // Hier soll die Logik zum Aktualisieren des Warenbestands in der Datenbank implementiert werden
    // die this.user.stockpileId wird benutzt, um die entsprechende Vorratslager-Datensatz zu identifizieren
    // und aktualisieren Sie die entsprechenden Felder (z. B. reduceStock()).
    // Beispiel:
    this.databaseService.reduceStock( this.invoice.items).subscribe(() => {
       this.submitOrder.emit(this.invoice);
     });
  }
  updateUserStockpile() {
    
    // die this.user.stockpileId wird benutzt, um die entsprechende Vorratslager-Datensatz zu identifizieren
    // Annahme: Die Methode updateUserStockpile(stockpileId, items) wird von der DatabaseService-Klasse bereitgestellt.

    this.databaseService.updateUserStockpile(this.user.stockpileId, this.invoice.items).subscribe(() => {
      // Schritt 4: Emitting des Bestellereignisses, um es an die Elternkomponenten weiterzugeben
      this.submitOrder.emit(this.invoice);

      // Schritt 5: Anzeigen der Bestellbestätigung im Browser (z. B. durch Ändern eines Statusfeldes)
      this.showOrderConfirmation();
    });
  }
  showOrderConfirmation() {
 
    this.orderConfirmation = 'Vielen Dank für Ihre Bestellung!';
  }
}

