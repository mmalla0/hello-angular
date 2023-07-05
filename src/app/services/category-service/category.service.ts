import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  categoryURL="getAllCategories"
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryURL);
  }

  categoryNameURL = "getAllCategoryNames"
  getAllCategoryNames(): Observable<String[]> {
    return this.http.get<String[]>(this.categoryNameURL);
  }


  private addCategoryURL = 'addCategory';
  addItem(category: any): void {
    this.http.post(this.addCategoryURL, category).subscribe(
      (response) => {
        // Handle success response
        console.log('Category added successfully');
      },
      (error) => {
        // Handle error
        console.error('Error adding category:', error);
      }
    );
  }


  private deleteCategoryURL = 'deleteCategory';

  deleteItem(categoryId: number): void {
    const url = `${this.deleteCategoryURL}/${categoryId}`;

    this.http.delete(url).subscribe(
      (response) => {
        // Handle success response
        console.log('Category deleted successfully');
      },
      (error) => {
        // Handle error
        console.error('Error deleting category:', error);
      }
    );
  }
}
