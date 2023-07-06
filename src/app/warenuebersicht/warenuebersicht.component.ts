import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../services/item-service/item.service';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  hoveredProduct: Item | null = null;
  searchQuery: string;
  priceRange: number;
  selectedCategory: string;
  categories: string[] = [
    'Art',
    'Electronics',
    'Fashion',
    'Food',
    'Health',
    'Science',
    'Tools',
    'Toys',
    'No filter',
  ];

  pageSize: number;
  currentPage: number;
  totalPageCount: number;

  ngOnInit() {
    this.setUpFilterValues();
    this.setUpItems();
  }

  constructor(
    public cartService: CartServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  setUpFilterValues() : void{
    this.searchQuery = '';
    this.priceRange = 210000;
    this.pageSize = 8;
    this.currentPage = 1;
    this.totalPageCount = 0;
  
    this.route.queryParams.subscribe(params => {
      if (params && params['extraParam']) {
        const receivedString = params['extraParam'];
        this.selectedCategory = receivedString;
      } else {
        this.selectedCategory = "No filter";
      }
    });
  }

  setUpItems() : void{
    this.itemService.getAllItems().subscribe({
      next: items => {
        this.products = items;
        this.filteredProducts = items;
        this.paginatedProducts = items;
        this.filterProducts();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  onMouseEnter(product: Item): void {
    this.hoveredProduct = product;
  }

  onMouseLeave(): void {
    this.hoveredProduct = null;
  }
  
  onAddToCart(product: Item): void {
    this.selectedItems.push(product);
    this.cartService.addItem(product);
  }
  
  onPriceRangeChange(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  onSearchProducts() {
    this.filteredProducts = this.products.filter(product => {
      return this.searchQuery ? product.item_name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
    });
    this.updatePaginatedProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const isPriceInRange = product.item_price <= this.priceRange;
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
