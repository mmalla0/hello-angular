/*export interface Item {
    id: number;
    name: string;
    price: number;
    //description: string;
    bestBeforeDate: string;
    quantity: number;
    picture: string;
    categories: string[];
}
*/
export interface Item {
    id: number;
    name: string;
    price: number;
    category_id: number;
    quantity: number;
    employee_id: number;
    bestBeforeDate: string;
    picture: string;
    categories: string[];
  }
