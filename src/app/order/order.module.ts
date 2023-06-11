import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderCreateComponent } from './order-create/order-create.component';

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderCreateComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule
  ]
})
export class OrderModule { }