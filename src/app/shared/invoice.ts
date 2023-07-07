import { Address } from "./address";
import { User } from "./user";


export interface Invoice {
    id: number;
    user: User;
    methodOfPayment: string;
    orderItems: OrderItem[];
    address: Address;
    totalWithVat: number;
    totalWithoutVat: number;
    shopName: string;
}

export interface CustomerAddress {
    firstName: string;
    lastName: string;
    street: string;
    postalCode: string;
    city: string;
}

export interface OrderItem {
    itemId: number;
    quantity: number;
    price: number;
  }
