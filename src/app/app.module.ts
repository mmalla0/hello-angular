import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressListComponent } from './address-list/address-list.component';
import { OrderComponent } from './order/order.component';
import { AddressListItemComponent } from './address-list-item/address-list-item.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { MitarbeiterDashboardComponent } from './mitarbeiter-dashboard/mitarbeiter-dashboard.component';
import { WarenuebersichtComponent } from './warenuebersicht/warenuebersicht.component';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from './cart/item-list/item-list.component';
import { LandingPageComponent } from './landingpage/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    OrderComponent,
    AddressListItemComponent,
    CartComponent,
    CartItemComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    MitarbeiterDashboardComponent,
    WarenuebersichtComponent,
    ItemListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
