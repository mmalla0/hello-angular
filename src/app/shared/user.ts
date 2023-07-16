export interface User {
    employee_id? : number;
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    addressId?: number;
    methodOfPayment?: string;
    cartId?: number; 
}

export interface StockpileItem {
    id: string;
    name: string;
    quantity: number;
    bestBeforeDate: Date;
    product: unknown;
    category: string;
}

