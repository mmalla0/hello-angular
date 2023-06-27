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
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ItemListComponent } from './cart/item-list/item-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseService } from './services/database.service';
import { StockpileListComponent } from './stockpile-list/stockpile-list.component';
import { StockpileItemComponent } from './stockpile-item/stockpile-item.component';
import { StockpileDashboardComponent } from './stockpile-dashboard/stockpile-dashboard.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MitarbeiterDashboardComponent } from './mitarbeiter-dashboard/mitarbeiter-dashboard.component';
import { WarenuebersichtComponent } from './warenuebersicht/warenuebersicht.component';
import { LandingPageComponent } from './landingpage/landing-page.component';
import { StockItemDetailsComponent } from './stock-item-details/stock-item-details.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    AppComponent,
    AddressListComponent,
    AddressListItemComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    RegisterComponent,
    ItemListComponent,
    StockpileListComponent,
    StockpileItemComponent,
    StockpileDashboardComponent,
    MitarbeiterDashboardComponent,
    WarenuebersichtComponent,
    LandingPageComponent,
    StockItemDetailsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class OrderModule { }
