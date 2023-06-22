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
  selectedItems: Item[] = []; 
  searchQuery: string;
  priceRange: number;
  selectedCategory: string;
  categories: string[] = ['Food', 'Health', 'Fashion','Art','Equipment','Toys','Science', 'Other', 'No filter'];


  ngOnInit() {

    this.products = [
      {id: 1, name: '2X2Re Stone', description: 'Mystery stone, veery precious', price: 50000, bestBeforeDate: '02.01.2320', storeQuantity: 3, pictures: ['space_stone.jpeg'], categories: ['Other','Art']},
      {id: 2, name: 'X-Wing', description: 'Relic from past times...', price: 67658, bestBeforeDate: '-', storeQuantity: 30, pictures: ['x_wing.jpeg'], categories: ['Equipment', 'Other']},
      {id: 3, name: 'Spacetronics Starsuit', description: 'Very comfortable!', price: 200000, bestBeforeDate: '-', storeQuantity: 11, pictures: ['spacesuite.jpg'], categories: ['Equipment', 'Fashion']},
      {id: 4, name: 'VirtuCare Pets - CatBot Edition', description: 'The perfect companion', price: 99.99, bestBeforeDate: '-', storeQuantity: 30, pictures: ['virtualpet_cat.jpg'], categories: ['Art', 'Toys', 'Other']},
      {id: 5, name: 'MediReady NanoBots', description: 'Works 100%', price:  5000.99, bestBeforeDate: '01.10.2300', storeQuantity: 30, pictures: ['healing_nanobots.jpg'], categories: ['Health']},
      {id: 6, name: 'Gravity implant', description: 'No more dizziness', price:  500.99, bestBeforeDate: '20.08.2300', storeQuantity: 30, pictures: ['gravity_adjusting_implants.jpg'], categories: ['Equipment']},
      {id: 7, name: 'Repair set', description: 'Repairs everything', price:  3000.99, bestBeforeDate: '-', storeQuantity: 20, pictures: ['toolbox_spaceship_repair.jpg'], categories: ['Equipment']},
      {id: 8, name: 'Underwater breathing implant', description: 'Discover new worlds', price:  360.01, bestBeforeDate: '03.20.2302', storeQuantity: 30, pictures: ['underwaterbreathing_implants.jpg'], categories: ['Equipment']}
    ];

    this.filteredProducts = this.products;
    this.searchQuery = '';
    this.priceRange = 200000; // Set default price range value
    this.selectedCategory = 'No filter';
  }

  onAddToCart(product: Item): void {
    this.selectedItems.push(product);
  }

  onPriceRangeChange() {
    this.filterProducts(); 
  }

  onCategoryChange() {
    this.filterProducts(); 
  }

  onSearchProducts() {
    this.filteredProducts = this.products.filter(product => {
      return this.searchQuery ? product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const isPriceInRange = product.price <= this.priceRange;
      const isCategoryMatch = this.selectedCategory === 'No filter' ? true : product.categories.includes(this.selectedCategory);
      return isPriceInRange && isCategoryMatch;
    });
  }
}