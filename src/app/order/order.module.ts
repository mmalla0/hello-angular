import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderCreateComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule
  ]
})
export class OrderModule { }
