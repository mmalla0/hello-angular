import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderCreateComponent,
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule
  ]
})
export class OrderModule { }
