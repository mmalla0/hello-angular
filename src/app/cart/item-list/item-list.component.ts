import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart-service/cart-service.service';
import { CartItem } from 'src/app/shared/cart-item';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit{
  @Input() items: CartItem[];

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.websocketService.connect().subscribe(frame => {
      console.log('WebSocket verbunden: ', frame);
             //zum Testen: console.log(frame)
      // Verarbeitet den WebSocket-Stream und aktualisiert die Produktliste
      this.updateProductList(frame.body);
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  updateProductList(data: any) {
    // Verarbeite die empfangenen Daten und aktualisiere die items-Eigenschaft
    // basierend auf der Verfügbarkeit der Produkte
    const parsedData = this.parseFrameBody(data);
    this.items = parsedData; // Annahme: Die Daten werden in einem geeigneten Format für die `items`-Eigenschaft bereitgestellt
  }

  parseFrameBody(body: string): any {
    const lines = body.split('\n');

    // Entferne das letzte Element, da es das NULL-Zeichen ist
    lines.pop();

    const parsedData: any = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') {
        // Leerzeile - Endpunkt der Kopfzeilen, Körper beginnt danach
        const bodyContent = lines.slice(i + 1).join('\n');
        parsedData.body = bodyContent;
        break;
      } else {
        // Kopfzeile verarbeiten
        const [key, value] = line.split(':');
        parsedData[key.trim()] = value.trim();
      }
    }

    return parsedData;
  }


  removeItemFromCartClicked(itemIdToRemove: number) {
    this.cartService.removeItem(itemIdToRemove);
  }

  onDecreaseClicked(item: CartItem) {
    this.cartService.decreaseItemQuantity(item);
  }

  onIncreaseClicked(item: CartItem) {
    this.cartService.increaseItemQuantity(item);
  }

  emptyCartClicked() {
    this.cartService.emptyCart();
  }

  onPurchaseClicked() {
    this.router.navigateByUrl('/order')
    // TODO add the path to the purchase formular
    // this.router.navigate([])
  }
}
