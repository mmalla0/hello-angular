export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    storeQuantity: number;
    pictures: string[];
    bestBeforeDate: string;
    categories: string[];
}


interface Image {
    imgitemID: number;
    img_url: string;
    imgAlt: string;
}