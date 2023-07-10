import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCreateComponent } from './order-create/order-create.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
  path: 'order',
  redirectTo: 'order/create'
  },

  {
    path: 'order/create',
      component: OrderCreateComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
