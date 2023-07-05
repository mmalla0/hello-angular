import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../shared/item';
import { FileUploadService } from '../services/file-upload-service/file-upload.service';

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

  ngOnInit() {
    if (this.isEditing) {
      this.editedProduct = { ...this.product };
      this.categoriesToAdd = [...this.editedProduct.categories];
    } else {
      //this.editedProduct = { id: 0, name: '', price: null, category_id: null, quantity: null, employee_id: null, bestBeforeDate: '', picture: '', categories: [] };
    }
  }

  constructor(private fileUploadService: FileUploadService) {}

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
  
  addCategory(): void {
    this.categoriesToAdd.push('');
  }

  removeCategory(index: number): void {
    this.categoriesToAdd.splice(index, 1);
  }

  cancel() {
    this.cancelClick.emit();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
