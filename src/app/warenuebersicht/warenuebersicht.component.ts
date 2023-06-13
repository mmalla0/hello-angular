import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';

@Component({
  selector: 'app-warenuebersicht',
  templateUrl: './warenuebersicht.component.html',
  styleUrls: ['./warenuebersicht.component.css']
})

export class WarenuebersichtComponent implements OnInit {
  products: Item[] = [];
  filteredProducts: Item[] = [];
  productQuantityMap: Map<Item, number> = new Map<Item, number>();
  searchQuery: string;
  priceRange: number;
  selectedCategory: string;
  categories: string[] = ['Essen', 'Ausrüstung', 'Kleidung','Sonstiges','Kunst','Spielzeug','Gesundheit'];


  ngOnInit() {

    this.products = [
      {id: 1, name: '2X2Re Stone', description: 'Mysteriöser Stein, suuuper wertvoll', price: 100.99, bestBeforeDate: '02.01.2320', storeQuantity: 3, pictures: ['space_stone.jpeg'], categories: ['Sonstiges','Kunst']},
      {id: 2, name: 'X-Wing', description: 'Relikt aus vergangenen Zeiten', price: 19.99, bestBeforeDate: '-', storeQuantity: 30, pictures: ['x_wing.jpeg'], categories: ['Ausrüstung', 'Sonstiges']},
      {id: 3, name: 'Spacetronics Starsuit', description: 'Very comfortable!', price: 20000000.99, bestBeforeDate: '-', storeQuantity: 11, pictures: ['spacesuite.jpg'], categories: ['Ausrüstung', 'Kleidung']},
      {id: 4, name: 'VirtuCare Pets - CatBot Edition', description: 'Macht sich perfekt auf der Raumschiff Armatur', price: 99.99, bestBeforeDate: '-', storeQuantity: 30, pictures: ['virtualpet_cat.jpg'], categories: ['Kunst', 'Spielzeug', 'Sonstiges']},
      {id: 5, name: 'MediReady NanoBots', description: 'Wirkt immer', price:  50.99, bestBeforeDate: '01.10.2300', storeQuantity: 30, pictures: ['healing_nanobots.jpg'], categories: ['Gesundheit']},
      {id: 6, name: 'Gravity implant', description: 'Nie wieder schwindel', price:  500.99, bestBeforeDate: '20.08.2300', storeQuantity: 30, pictures: ['gravity_adjusting_implants.jpg'], categories: ['Ausrüstung']},
      {id: 7, name: 'Repair set', description: 'Damit bekommst du alles heile', price:  30.99, bestBeforeDate: '-', storeQuantity: 20, pictures: ['toolbox_spaceship_repair.jpg'], categories: ['Ausrüstung']},
      {id: 8, name: 'Underwater breathing implant', description: 'Erkunde neue Welten', price:  300.01, bestBeforeDate: '03.20.2302', storeQuantity: 30, pictures: ['underwaterbreathing_implants.jpg'], categories: ['Ausrüstung']}
    ];

    this.filteredProducts = this.products;
    this.searchQuery = '';
    this.priceRange = 50; // Set default price range value
    this.selectedCategory = '';

    this.products.forEach(product => {
      this.productQuantityMap.set(product, 0); // Set default quantity to 0 for all products
    });
  }

  searchProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product => {
        return this.searchQuery === product.name;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }
  


  filterProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product => {
        // Filter products based on search query (name or any other property)
        return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredProducts = this.products; // Reset filter if search query is empty
    }
  }

  onQuantityChange(product: Item, event: any) {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity)) {
      this.productQuantityMap.set(product, quantity); // Update the quantity in the map
    }
  }
  
  onAddToCart(product: Item): void {
    const quantity = this.productQuantityMap.get(product);
    // Perform the necessary logic to add the product to the cart with the specified quantity
    console.log('Adding to cart:', product, 'Quantity:', quantity);
  }
}





