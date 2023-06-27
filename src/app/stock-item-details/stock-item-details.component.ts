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
  categoriesToAdd: string[] = [];

  ngOnInit() {
    if (this.isEditing) {
      this.editedProduct = { ...this.product };
      this.categoriesToAdd = [...this.editedProduct.categories];
    } else {
      this.editedProduct = { id: 0, name: '', price: null, bestBeforeDate: '', quantity: null, picture: '', categories: [] };
    }
  }

  save(): void {
    const editedProduct: Item = {
      ...this.editedProduct,
      categories: this.categoriesToAdd.filter((category) => category.trim() !== '')
    };
    this.saveClick.emit(editedProduct);
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Update the picture property of the product or categoriesToAdd array
    }
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
