import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StockpileDashboardComponent } from './stockpile-dashboard/stockpile-dashboard.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stockpile', component: StockpileDashboardComponent },

  // Nutzer zur Hauptseite weiterleiten
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
