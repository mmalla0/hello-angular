import { StockpileItem } from 'src/app/stockpile-item.component';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    addressId: number;
    methodOfPayment: string;
    cartId: number; 
    stockpileId: number;
}
export interface StockpileItem {
    id: string;
    name: string;
    quantity: number;
}

