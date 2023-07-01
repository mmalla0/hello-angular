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
  filePath : String;

  ngOnInit() {
    if (this.isEditing) {
      this.editedProduct = { ...this.product };
      this.categoriesToAdd = [...this.editedProduct.categories];
    } else {
      this.editedProduct = { id: 0, name: '', price: null, bestBeforeDate: '', quantity: null, picture: '', categories: [] };
    }
  }

  constructor(private fileUploadService: FileUploadService) {}

  save(): void {
    const editedProduct: Item = {
      ...this.editedProduct,
      categories: this.categoriesToAdd.filter((category) => category.trim() !== '')
    };
    this.saveClick.emit(editedProduct);
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];
    this.fileUploadService.uploadFile(file)
      .then(response => {
        console.log('File uploaded successfully.');
        const fileName = file.name;
        this.filePath = "uploads/" + fileName; 
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
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
