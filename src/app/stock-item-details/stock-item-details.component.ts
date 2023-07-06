import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../shared/item';
import { FileUploadService } from '../services/file-upload-service/file-upload.service';
import { CategoryService } from '../services/category-service/category.service';


@Component({
  selector: 'app-stock-item-details',
  templateUrl: './stock-item-details.component.html',
  styleUrls: ['./stock-item-details.component.css']
})
export class StockItemDetailsComponent implements OnInit {
  @Input() product: Item;
  @Input() isEditing: boolean;
  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveClick: EventEmitter<Item> = new EventEmitter<Item>();
  editedProduct: Item;
  categoriesToAdd: string[] = [];
  file: File;

  categories: { category_name: string; selected: boolean }[] = [];


  ngOnInit() {
    this.categoryService.getAllCategoryNames().subscribe({
      next: categoryNames => {
        this.categories = categoryNames.map(category => ({
          category_name: category,
          selected: false
        }));
      }
    });
  
    if (this.isEditing) {
      this.editedProduct = { ...this.product };
      this.editedProduct.categories.forEach(category => {
        const foundCategory = this.categories.find(c => c.category_name === category);
        if (foundCategory) {
          foundCategory.selected = true;
        }
      });
    } else {
      this.editedProduct = { item_ID: null, item_name: '', item_description: null, item_price: null, stock: null, employee_id: null, best_before: '', item_imgpath: '', categories: [] };
    }
  }
  
  constructor(private fileUploadService: FileUploadService, private categoryService: CategoryService) {}

  save(): void {
    const editedProduct: Item = {
      ...this.editedProduct,
      categories: this.categoriesToAdd.filter((category) => category.trim() !== '')
    };

    if (this.file) {
      this.fileUploadService.uploadFile(this.file)
        .then(response => {
          console.log('File uploaded successfully.');
          const fileName = response.fileName;
          editedProduct.item_imgpath = fileName;
          this.editedProduct.item_imgpath = fileName;
          this.saveClick.emit(editedProduct);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    } else {
      this.saveClick.emit(editedProduct);
    }
  }

  handleFileUpload(event: any) {
    this.file = event.target.files[0];
  }

  cancel() {
    this.cancelClick.emit();
  }

  trackByIndex(index: number): number {
    return index;
  }

  updateCategorySelection(categoryName: string, newValue: boolean) {
    const categoryObject = this.categories.find(c => c.category_name === categoryName);
    if (categoryObject) {
      categoryObject.selected = newValue;
    }
  }
}
