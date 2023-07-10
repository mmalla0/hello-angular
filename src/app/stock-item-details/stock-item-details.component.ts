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
        this.setUpProducts();
      }
    });
  }
  
  constructor(private fileUploadService: FileUploadService, private categoryService: CategoryService) {}

  setUpProducts() : void{
    if (this.isEditing) {
      this.editedProduct = { ...this.product };
      this.editedProduct.categories.forEach(category => {
        const foundCategory = this.categories.find(c => c.category_name === category);
        if (foundCategory) {
          foundCategory.selected = true;
        }
      });
    } else {
      this.editedProduct = {
        item_ID: 0,
        item_name: '',
        item_description: '',
        item_price: 0,
        stock: 0,
        employee_id: 0,
        best_before: null,
        item_imgpath: '',
        categories: []
    };
    }
  }

  save(): void {
    console.log('Save button clicked');
    const editedProduct: Item = {
      ...this.editedProduct,
      categories: this.categories
        .filter(category => category.selected)
        .map(category => category.category_name)
    };  

    if (this.file) {
      console.log('Waiting for file upload');
      this.saveFile(editedProduct); 
    } else {
      console.log('SaveClick emitted');
      this.saveClick.emit(editedProduct);
    }
  }

  saveFile(editedProduct : Item) : void{
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
  }

  convertToDate(dateString: string): Date { 
    return new Date(dateString);
  }

  handleDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const dateValue = target.value; 
    const date = new Date(dateValue); 
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    this.editedProduct.best_before = `${year}-${month}-${day}`;
  }
  

  handleFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0] as File;
    }
  }

  cancel() {
    this.cancelClick.emit();
  }

  updateCategorySelection(categoryName: string, newValue: boolean) {
    const categoryObject = this.categories.find(c => c.category_name === categoryName);
    if (categoryObject) {
      categoryObject.selected = newValue;
    }
  }
}
