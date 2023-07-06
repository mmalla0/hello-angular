
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    addressId: number;
    methodOfPayment: string;
    cartId: number; 
    stockpileId: number;
}



export interface StockpileItem {
    id: string;
    name: string;
    quantity: number;
    bestBeforeDate: Date;
    product: string;
    category: string;
}
export interface StockpileItemEntry {
    product: StockpileItem;
    bestBeforeDates: {
      date: Date;
      count: number;
    }[];
  }

