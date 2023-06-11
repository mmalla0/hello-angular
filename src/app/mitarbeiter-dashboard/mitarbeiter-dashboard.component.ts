import { Component } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-mitarbeiter-dashboard',
  templateUrl: './mitarbeiter-dashboard.component.html',
  styleUrls: ['./mitarbeiter-dashboard.component.css']
})
export class MitarbeiterDashboardComponent {
  products: Product[] = [];

  ngOnInit() {
    // Hardcoded list of products for testing
    this.products = [
      new Product(1, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', ['space_stone.jpeg'], ['Sonstiges'], 5),
      new Product(2, 'X-Wing', 19.99, 'Old relict from previous days', ['x_wing.jpeg'], ['Ausrüstung', 'Sonstiges'], 30),
      new Product(1, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', ['space_stone.jpeg', 'x_wing.jpeg'], ['Sonstiges'], 5),
      new Product(2, 'X-Wing', 19.99, 'Old relict from previous days', ['x_wing.jpeg'], ['Ausrüstung', 'Sonstiges'], 30),
      new Product(1, '2X2Re Stone', 100.99, 'Mystery stone, veryy precious', ['space_stone.jpeg'], ['Sonstiges'], 5),
      new Product(2, 'X-Wing', 19.99, 'Old relict from previous days', ['x_wing.jpeg'], ['Ausrüstung', 'Sonstiges'], 30)
    ];
  }
}
