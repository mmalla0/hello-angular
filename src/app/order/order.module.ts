import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';


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
