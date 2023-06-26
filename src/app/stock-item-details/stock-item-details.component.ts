import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../shared/item';

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

  
  ngOnInit() {
    if (this.isEditing) {
      this.editedProduct = { ...this.product }; // Assign a copy of product to editedProduct

    } else {
      this.editedProduct = { id: 0, name: '', price: null, bestBeforeDate: '', quantity: null, picture: '', categories: [] };
    }
  }

  save(): void {
    this.saveClick.emit(this.editedProduct);
      this.editedProduct.categories = this.editedProduct.categories.filter((category: string) => category.trim() !== '');
  }
  
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.editedProduct.picture = file.name;
    }
  }

  addCategory(): void {
    this.editedProduct.categories.push('');
  }

  removeCategory(index: number): void {
    this.editedProduct.categories.splice(index, 1);
  }

  cancel() {
    this.cancelClick.emit();
  }

  updateCategories(): void {
    this.editedProduct.categories = this.editedProduct.categories.filter((category: string) => category.trim() !== '');
  }
}
