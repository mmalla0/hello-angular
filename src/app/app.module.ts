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
import { StockpileListComponent } from './stockpile-list/stockpile-list.component';
import { StockpileItemComponent } from './stockpile-item/stockpile-item.component';
import { StockpileDashboardComponent } from './stockpile-dashboard/stockpile-dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MitarbeiterDashboardComponent } from './mitarbeiter-dashboard/mitarbeiter-dashboard.component';
import { WarenuebersichtComponent } from './warenuebersicht/warenuebersicht.component';
import { LandingPageComponent } from './landingpage/landing-page.component';
import { StockItemDetailsComponent } from './stock-item-details/stock-item-details.component';
import { ToastrModule } from 'ngx-toastr';
import { TesterComponent } from "./testing";
import { OrderFormComponent } from './order/order-form/order-form.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AuthService } from './services/auth-service/auth.service';
import { StockpileService } from './services/stockpile.service';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderComponent } from './order/order.component';

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
    StockItemDetailsComponent,
    OrderFormComponent,
    OrderCreateComponent,
    OrderComponent,
    TesterComponent,
    CategoryDetailComponent,
    ItemDetailsComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [AuthService, StockpileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
