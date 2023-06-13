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
  categories: string[] = ['Essen', 'Ausrüstung', 'Kleidung','Sonstiges']; // Replace with your actual categories

  

  ngOnInit() {
    // Hardcoded list of products for testing
    this.products = [
      {id: 1, name: '2X2Re Stone', description: 'Mystery stone, veryy precious', price: 100.99, bestBeforeDate: '12.20.2020', storeQuantity: 3, pictures: ['space_stone.jpeg'], categories: ['Sonstiges']},
      {id: 2, name: 'X-Wing', description: 'Old relict from previous days', price: 19.99, bestBeforeDate: '12.20.2020', storeQuantity: 30, pictures: ['x_wing.jpeg'], categories: ['Ausrüstung', 'Sonstiges']},
      {id: 3, name: '2X2Re Stone', description: 'Mystery stone, veryy precious', price: 100.99, bestBeforeDate: '12.20.2020', storeQuantity: 3, pictures: ['space_stone.jpeg'], categories: ['Sonstiges']},
      {id: 4, name: 'X-Wing', description: 'Old relict from previous days', price: 19.99, bestBeforeDate: '12.20.2020', storeQuantity: 30, pictures: ['x_wing.jpeg'], categories: ['Ausrüstung', 'Sonstiges']},
      {id: 5, name: '2X2Re Stone', description: 'Mystery stone, veryy precious', price: 100.99, bestBeforeDate: '12.20.2020', storeQuantity: 3, pictures: ['space_stone.jpeg'], categories: ['Sonstiges']},
      {id: 6, name: 'X-Wing', description: 'Old relict from previous days', price: 19.99, bestBeforeDate: '12.20.2020', storeQuantity: 30, pictures: ['x_wing.jpeg'], categories: ['Ausrüstung', 'Sonstiges']}
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





