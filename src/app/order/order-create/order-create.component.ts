import { Component, EventEmitter, Output } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice';
import { PdfService } from 'src/app/services/pdf.service';
import { EmailService } from 'src/app/services/email.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { StockpileService } from 'src/app/services/stockpile.service';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/services/user.service';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})

export class OrderCreateComponent {

  invoice: Invoice = {
    id: 0,
    user: undefined,
    methodOfPayment: '',
    orderItems: [],
    address: undefined,
    totalWithVat: 0,
    totalWithoutVat: 0,
    shopName: ''
  };
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    addressId: 0,                
    methodOfPayment: '',
    cartId: 0,
    //stockpileId: 0
  }
  orderConfirmation: string;

  constructor(
    private pdfService: PdfService,
    private emailService: EmailService,
    private itemService: ItemService,
    private stockpileService: StockpileService,    
    private userService: UserService,
    private cartService: CartServiceService, 
    private authService: AuthService
  ) {}

  handleFormSubmit(invoice: Invoice) {
    // Schritt 1: Erstellung der Rechnung als PDF
    console.log("Rechnung wird mit folgenden Daten erstellt: " + invoice);
    this.pdfService.createInvoicePDF(invoice).subscribe((pdfData) => {
      // Schritt 2: Versenden der E-Mail mit der Rechnung als Anhang
      console.log("Rechnung wird an folgende Adresse versendet: " + this.userService.getEmailAddress());
      const emailAddress: string = this.userService.getEmailAddress() ;
      this.emailService
        .sendEmailWithAttachment(emailAddress, 'Rechnung', 'Siehe Anhang', pdfData)
        .subscribe(() => {
          // Schritt 3: Aktualisierung des Warenbestands in der Datenbank
          this.updateStock();
          //Schritt 4: Aktualisierung des persönlichen Stockpiles des Users
          this.updateUserStockpile();
        });
    });
  }

  updateStock() {
    //Logik zum Aktualisieren des Warenbestands in der Datenbank 
    console.log("Das sind die Artikel im Warenkorb, die nun vom Bestand reduziert werden sollen: " + this.cartService.cartItems);
    this.itemService.reduceStock(this.cartService.cartItems).subscribe(() => {
      this.submitOrder.emit(this.invoice);
    });
    
    
    
    //Todo: entfernen, nur zum Testen hier! 
    this.updateUserStockpile();
  }

  updateUserStockpile() {
    // die currentUser.id wird benutzt, um die entsprechende Vorratslager-Datensatz zu identifizieren
    // Annahme: Die Methode updateUserStockpile(usereId, cartItems) wird von der stockpileService-Klasse bereitgestellt.
    console.log("Jetzt wird der Stockpile upgedatet mit den folgenden items: " + this.cartService.cartItems + " für folgende UserId: " + this.authService.currentUser.id);
    this.stockpileService.updateUserStockpile(this.authService.currentUser.id, this.cartService.cartItems).subscribe(() => {
      // Schritt 4: Emitting des Bestellereignisses, um es an die Elternkomponenten weiterzugeben
      this.submitOrder.emit(this.invoice);
      this.cartService.emptyCart();
      // Schritt 5: Anzeigen der Bestellbestätigung im Browser (z. B. durch Ändern eines Statusfeldes)
      //this.showOrderConfirmation();
    });
  }

  showOrderConfirmation() {
    this.orderConfirmation = 'Thank you for your business! The invoice has been sent to your inbox.';
  }

  @Output() submitOrder = new EventEmitter<Invoice>();
}
  


