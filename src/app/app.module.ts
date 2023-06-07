import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { AddressListComponent } from './address-list/address-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { AddressListItemComponent } from './address-list-item/address-list-item.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { TicketsComponent } from './tickets/tickets.component';


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    AddressListComponent,
    OrderFormComponent,
    AddressListItemComponent,
    CartComponent,
    CartItemComponent,
    TicketsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }