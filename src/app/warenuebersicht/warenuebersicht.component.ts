import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warenuebersicht',
  templateUrl: './warenuebersicht.component.html',
  styleUrls: ['./warenuebersicht.component.css'],
})
export class WarenuebersichtComponent implements OnInit {
  products: Item[] = [];
  filteredProducts: Item[] = [];
  paginatedProducts: Item[] = [];
  selectedItems: Item[] = [];
  searchQuery: string;
  priceRange: number;
  selectedCategory: string;
  categories: string[] = [
    'Food',
    'Health',
    'Fashion',
    'Art',
    'Equipment',
    'Toys',
    'Science',
    'Other',
    'No filter',
  ];

  pageSize: number;
  currentPage: number;
  totalPageCount: number;

  ngOnInit() {
    this.products = [

      {
        id: 1,
        name: '2X2Re Stone',
       // description: 'Mystery stone, veery precious',
        price: 50000,
        bestBeforeDate: '02.01.2320',
        quantity: 3,
        picture: 'space_stone.jpeg',
        categories: ['Other', 'Art'],
      },
      {
        id: 2,
        name: 'X-Wing',
       // description: 'Relic from past times...',
        price: 67658,
        bestBeforeDate: '-',
        quantity: 30,
        picture: 'x_wing.jpeg',
        categories: ['Equipment', 'Other'],
      },
      {
        id: 3,
        name: 'Spacetronics Starsuit',
        //description: 'Very comfortable!',
        price: 200000,
        bestBeforeDate: '-',
        quantity: 11,
        picture: 'spacesuite.jpg',
        categories: ['Equipment', 'Fashion'],
      },
      {
        id: 4,
        name: 'VirtuCare Pets - CatBot Edition',
        //description: 'The perfect companion',
        price: 99.99,
        bestBeforeDate: '-',
        quantity: 30,
        picture: 'virtualpet_cat.jpg',
        categories: ['Art', 'Toys', 'Other'],
      },
      {
        id: 5,
        name: 'MediReady NanoBots',
       // description: 'Works 100%',
        price: 5000.99,
        bestBeforeDate: '01.10.2300',
        quantity: 30,
        picture: 'healing_nanobots.jpg',
        categories: ['Health'],
      },
      {
        id: 6,
        name: 'Gravity implant',
        //description: 'No more dizziness',
        price: 500.99,
        bestBeforeDate: '20.08.2300',
        quantity: 30,
        picture: 'gravity_adjusting_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 7,
        name: 'Repair set',
       // description: 'Repairs everything',
        price: 3000.99,
        bestBeforeDate: '-',
        quantity: 20,
        picture: 'toolbox_spaceship_repair.jpg',
        categories: ['Equipment'],
      },
      {
        id: 8,
        name: 'Underwater breathing implant',
        //description: 'Discover new worlds',
        price: 360.01,
        bestBeforeDate: '03.20.2302',
        quantity: 30,
        picture: 'underwaterbreathing_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 9,
        name: 'Gravity implant',
        //description: 'No more dizziness',
        price: 500.99,
        bestBeforeDate: '20.08.2300',
        quantity: 30,
        picture: 'gravity_adjusting_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 10,
        name: 'Repair set',
        //description: 'Repairs everything',
        price: 3000.99,
        bestBeforeDate: '-',
        quantity: 20,
        picture: 'toolbox_spaceship_repair.jpg',
        categories: ['Equipment'],
      },
      {
        id: 11,
        name: 'Underwater breathing implant',
        //description: 'Discover new worlds',
        price: 360.01,
        bestBeforeDate: '03.20.2302',
        quantity: 30,
        picture: 'underwaterbreathing_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 12,
        name: 'Gravity implant',
       // description: 'No more dizziness',
        price: 500.99,
        bestBeforeDate: '20.08.2300',
        quantity: 30,
        picture: 'gravity_adjusting_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 13,
        name: 'Repair set',
        //description: 'Repairs everything',
        price: 3000.99,
        bestBeforeDate: '-',
        quantity: 20,
        picture: 'toolbox_spaceship_repair.jpg',
        categories: ['Equipment'],
      },
      {
        id: 14,
        name: 'Underwater breathing implant',
       // description: 'Discover new worlds',
        price: 360.01,
        bestBeforeDate: '03.20.2302',
        quantity: 30,
        picture: 'underwaterbreathing_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 15,
        name: 'Gravity implant',
        //description: 'No more dizziness',
        price: 500.99,
        bestBeforeDate: '20.08.2300',
        quantity: 30,
        picture: 'gravity_adjusting_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 16,
        name: 'Repair set',
        //description: 'Repairs everything',
        price: 3000.99,
        bestBeforeDate: '-',
        quantity: 20,
        picture: 'toolbox_spaceship_repair.jpg',
        categories: ['Equipment'],
      },
      {
        id: 17,
        name: 'Underwater breathing implant',
        //description: 'Discover new worlds',
        price: 360.01,
        bestBeforeDate: '03.20.2302',
        quantity: 30,
        picture: 'underwaterbreathing_implants.jpg',
        categories: ['Equipment'],
      },
      {
        id: 18,
        name: 'Gravity implant',
        //description: 'No more dizziness',
        price: 500.99,
        bestBeforeDate: '20.08.2300',
        quantity: 30,
        picture: 'gravity_adjusting_implants.jpg',
        categories: ['Equipment'],
      },

      {id: 1, name: '2X2Re Stone', price: 50000, bestBeforeDate: '02.01.2320', quantity: 3, picture: 'space_stone.jpeg', categories: ['Other','Art']},
      {id: 2, name: 'X-Wing', price: 67658, bestBeforeDate: '-', quantity: 30, picture: 'x_wing.jpeg', categories: ['Equipment', 'Other']},
      {id: 3, name: 'Spacetronics Starsuit', price: 200000, bestBeforeDate: '-', quantity: 11, picture: 'spacesuite.jpg', categories: ['Equipment', 'Fashion']},
      {id: 4, name: 'VirtuCare Pets - CatBot Edition', price: 99.99, bestBeforeDate: '-', quantity: 30, picture: 'virtualpet_cat.jpg', categories: ['Art', 'Toys', 'Other']},
      {id: 5, name: 'MediReady NanoBots', price:  5000.99, bestBeforeDate: '01.10.2300', quantity: 30, picture: 'healing_nanobots.jpg', categories: ['Health']},
      {id: 6, name: 'Gravity implant', price:  500.99, bestBeforeDate: '20.08.2300', quantity: 30, picture: 'gravity_adjusting_implants.jpg', categories: ['Equipment']},
      {id: 7, name: 'Repair set', price:  3000.99, bestBeforeDate: '-', quantity: 20, picture: 'toolbox_spaceship_repair.jpg', categories: ['Equipment']},
      {id: 8, name: 'Underwater breathing implant', price:  360.01, bestBeforeDate: '03.20.2302', quantity: 30, picture: 'underwaterbreathing_implants.jpg', categories: ['Equipment']},
      {id: 9, name: 'Gravity implant', price:  500.99, bestBeforeDate: '20.08.2300', quantity: 30, picture: 'gravity_adjusting_implants.jpg', categories: ['Equipment']},
      {id: 10, name: 'Repair set', price:  3000.99, bestBeforeDate: '-', quantity: 20, picture: 'toolbox_spaceship_repair.jpg', categories: ['Equipment']},
      {id: 11, name: 'Underwater breathing implant', price:  360.01, bestBeforeDate: '03.20.2302', quantity: 30, picture: 'underwaterbreathing_implants.jpg', categories: ['Equipment']},
      {id: 12, name: 'Gravity implant', price:  500.99, bestBeforeDate: '20.08.2300', quantity: 30, picture: 'gravity_adjusting_implants.jpg', categories: ['Equipment']},
      {id: 13, name: 'Repair set', price:  3000.99, bestBeforeDate: '-', quantity: 20, picture: 'toolbox_spaceship_repair.jpg', categories: ['Equipment']},
      {id: 14, name: 'Underwater breathing implant', price:  360.01, bestBeforeDate: '03.20.2302', quantity: 30, picture: 'underwaterbreathing_implants.jpg', categories: ['Equipment']},
      {id: 15, name: 'Gravity implant', price:  500.99, bestBeforeDate: '20.08.2300', quantity: 30, picture: 'gravity_adjusting_implants.jpg', categories: ['Equipment']},
      {id: 16, name: 'Repair set', price:  3000.99, bestBeforeDate: '-', quantity: 20, picture: 'toolbox_spaceship_repair.jpg', categories: ['Equipment']},
      {id: 17, name: 'Underwater breathing implant', price:  360.01, bestBeforeDate: '03.20.2302', quantity: 30, picture: 'underwaterbreathing_implants.jpg', categories: ['Equipment']},
      {id: 18, name: 'Gravity implant', price:  500.99, bestBeforeDate: '20.08.2300', quantity: 30, picture: 'gravity_adjusting_implants.jpg', categories: ['Equipment']}

    ];

    this.filteredProducts = this.products;

    this.searchQuery = '';
    this.priceRange = 200000; // Set default price range value
    this.selectedCategory = 'No filter';
    this.pageSize = 8;
    this.currentPage = 1;
    this.totalPageCount = 0;

    this.filterProducts();
  }

  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) {}
/*
  onAddToCart(product: Item): void {
    // this.selectedItems.push(product);
    this.cartService.addItem(product);
  }
  
  */

  onPriceRangeChange(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  onSearchProducts() {
    this.filteredProducts = this.products.filter(product => {
      return this.searchQuery ? product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
    });
    this.updatePaginatedProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const isPriceInRange = product.price <= this.priceRange;
      const isCategoryMatch =
        this.selectedCategory === 'No filter'
          ? true
          : product.categories.includes(this.selectedCategory);
      return isPriceInRange && isCategoryMatch;
    });
    this.totalPageCount = Math.ceil(
      this.filteredProducts.length / this.pageSize
    );
    if (this.currentPage > this.totalPageCount) {
      this.currentPage = 1;
    }

    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  getPageNumbers(): { number: number; isCurrent: boolean }[] {
    return Array(this.totalPageCount)
      .fill(0)
      .map((_, index) => ({
        number: index + 1,
        isCurrent: index + 1 === this.currentPage,
      }));
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
