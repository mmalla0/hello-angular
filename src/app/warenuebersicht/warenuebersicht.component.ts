import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-warenuebersicht',
  templateUrl: './warenuebersicht.component.html',
  styleUrls: ['./warenuebersicht.component.css']
})

export class WarenuebersichtComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery = '';
  productQuantityMap: Map<Product, number> = new Map<Product, number>();


  ngOnInit() {
    // Hardcoded list of products for testing
    this.products = [
      new Product(1, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', 'space_stone.jpeg'),
      new Product(2, 'X-Wing', 19.99, 'Old relict from previous days', 'x_wing.jpeg'),
      new Product(3, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', 'space_stone.jpeg'),
      new Product(4, 'X-Wing', 19.99, 'Old relict from previous days', 'x_wing.jpeg'),
      new Product(5, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', 'space_stone.jpeg'),
      new Product(6, 'X-Wing', 19.99, 'Old relict from previous days', 'x_wing.jpeg'),
      new Product(7, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', 'space_stone.jpeg'),
      new Product(8, 'X-Wing', 19.99, 'Old relict from previous days', 'x_wing.jpeg'),
    ];

    this.filteredProducts = this.products;

    this.products.forEach(product => {
      this.productQuantityMap.set(product, 0); // Set default quantity to 0 for all products
    });
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

  onQuantityChange(product: Product, event: any) {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity)) {
      this.productQuantityMap.set(product, quantity); // Update the quantity in the map
    }
  }
  
  onAddToCart(product: Product): void {
    const quantity = this.productQuantityMap.get(product);
    // Perform the necessary logic to add the product to the cart with the specified quantity
    console.log('Adding to cart:', product, 'Quantity:', quantity);
  }
}





