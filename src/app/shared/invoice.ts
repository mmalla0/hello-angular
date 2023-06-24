import { Address } from "./address";
import { Item } from "./item";
import { User } from "./user";


export interface Invoice {
    id: number;
    user: User;
    methodOfPayment: string;
    items : Item[];
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
