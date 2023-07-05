import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WarenuebersichtComponent } from './warenuebersicht/warenuebersicht.component';
import { MitarbeiterDashboardComponent } from './mitarbeiter-dashboard/mitarbeiter-dashboard.component';
import { LandingPageComponent } from './landingpage/landing-page.component';
import { CartComponent } from './cart/cart.component';
import { StockpileDashboardComponent } from './stockpile-dashboard/stockpile-dashboard.component';
import { OrderFormComponent } from './order/order-form/order-form.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: MitarbeiterDashboardComponent },
  { path: 'warenübersicht', component: WarenuebersichtComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'stockpile', component: StockpileDashboardComponent },
  { path: 'order', component: OrderFormComponent },
  // Nutzer zur Hauptseite weiterleiten
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
