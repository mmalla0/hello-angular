import { Component,  EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../services/category-service/category.service';
import { Category } from '../shared/category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit{
  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();
  categories: Category[] = [];
  newCategoryName = '';
  newCategoryDescription = '';

  ngOnInit(): void {
    this.getCategoriesFromDatabase();
  }

  constructor(private categoryService: CategoryService) {}

  getCategoriesFromDatabase() : void{
    this.categoryService.getAllCategories().subscribe({
      next: allCategories => {
        this.categories = allCategories;
        this.categories.forEach(category => {
          console.log("Category ID:", category.category_id);
          console.log("Category Name:", category.category_name);
          console.log("Category Description:", category.category_description);
          console.log("--------------------");
        });
      }
    });
  }

  addCategory() {
    this.categoryService.addItem(this.newCategoryName, this.newCategoryDescription);
    setTimeout(() => {
      this.getCategoriesFromDatabase();
    }, 1000);
  }

  removeCategory(category: Category) {
    this.categoryService.deleteItem(category.category_id);
    setTimeout(() => {
      this.getCategoriesFromDatabase();
    }, 1000);
  }

  cancel() {
    this.cancelClick.emit();
  }
}
