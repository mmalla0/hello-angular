export class Product {
    id: number;
    name: string;
    price: number;
    description: string;
    storeQuantity: number;
    pictures: string[];
    categories: string[];
  
    constructor(id : number, name: string, price: number, description: string, pictures: string[], categories: string[], storeQuantity: number) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.description = description;
      this.pictures = pictures;
      this.categories = categories;
      this.storeQuantity = storeQuantity;
    }
  }
  