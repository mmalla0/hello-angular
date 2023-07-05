export interface Item {
    item_ID: number;
    item_name: string;
    item_description: string;
    item_price: number;
    stock: number;
    employee_id: number;
    best_before: string;
    item_imgpath: string;
    categories: string[];
}
