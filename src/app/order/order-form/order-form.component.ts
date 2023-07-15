import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Invoice } from 'src/app/shared/invoice';
import { Address } from 'src/app/shared/address';
import { AddressService } from 'src/app/services/address-service/address.service';
import { User } from 'src/app/shared/user';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { StockpileService } from 'src/app/services/stockpile.service';

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
  constructor(private authService: AuthService,  
    private addressService: AddressService,  
    private cartService: CartServiceService, 
    private itemService: ItemService, 
    private stockpileService : StockpileService) {
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


  //TODO entfernen, nur zum Testen hier!
  /*
  updateStock() {
    //Logik zum Aktualisieren des Warenbestands in der Datenbank 
    console.log(this.cartService.cartItems);
    this.itemService.reduceStock(this.cartService.cartItems).subscribe(() => {
      this.submitOrder.emit(this.invoice);
     });
     this.cartService.emptyCart();
     
     
     //Todo: entfernen, nur zum Testen hier! 
     this.updateUserStockpile();
  }
  
  updateUserStockpile() {
    // die this.user.stockpileId wird benutzt, um die entsprechende Vorratslager-Datensatz zu identifizieren
    // Annahme: Die Methode updateUserStockpile(stockpileId, orderItems) wird von der stockpileService-Klasse bereitgestellt.

    this.stockpileService.updateUserStockpile(this.authService.currentUser.id, this.cartService.cartItems).subscribe(() => {
      // Schritt 4: Emitting des Bestellereignisses, um es an die Elternkomponenten weiterzugeben
      this.submitOrder.emit(this.invoice);

      // Schritt 5: Anzeigen der Bestellbestätigung im Browser (z. B. durch Ändern eines Statusfeldes)
      //this.showOrderConfirmation();
    });
  }
  */
}
