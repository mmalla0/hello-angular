import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landingpage/landing-page.component';
import { MitarbeiterDashboardComponent } from './mitarbeiter-dashboard/mitarbeiter-dashboard.component';
import { WarenuebersichtComponent } from './warenuebersicht/warenuebersicht.component';

const routes: Routes = [

  { path: 'dashboard', component: MitarbeiterDashboardComponent },
  { path: 'warenübersicht', component: WarenuebersichtComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Nutzer zur Hauptseite weiterleiten
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
