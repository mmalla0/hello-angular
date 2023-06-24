import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressListItemComponent } from './address-list-item/address-list-item.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { ItemListComponent } from './cart/item-list/item-list.component';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    AddressListItemComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    RegisterComponent,
    ItemListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
