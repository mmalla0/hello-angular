import { Component } from '@angular/core';
import { Item } from '../shared/item';

@Component({
  selector: 'app-mitarbeiter-dashboard',
  templateUrl: './mitarbeiter-dashboard.component.html',
  styleUrls: ['./mitarbeiter-dashboard.component.css']
})
export class MitarbeiterDashboardComponent {
  products: Item[] = [];

  ngOnInit() {
    // Hardcoded list of products for testing
    this.products = [
      {id: 1, name: '2X2Re Stone', description: 'Mystery stone, veryy precious', price: 100.99, bestBeforeDate: '12.20.2020', quantity: 3, pictures: ['space_stone.jpeg'], categories: ['Sonstiges']},
      {id: 2, name: 'X-Wing', description: 'Old relict from previous days', price: 19.99, bestBeforeDate: '12.20.2020', quantity: 30, pictures: ['x_wing.jpeg'], categories: ['Ausrüstung', 'Sonstiges']},
      {id: 3, name: '2X2Re Stone', description: 'Mystery stone, veryy precious', price: 100.99, bestBeforeDate: '12.20.2020', quantity: 3, pictures: ['space_stone.jpeg'], categories: ['Sonstiges']},
      {id: 4, name: 'X-Wing', description: 'Old relict from previous days', price: 19.99, bestBeforeDate: '12.20.2020', quantity: 30, pictures: ['x_wing.jpeg'], categories: ['Ausrüstung', 'Sonstiges']}
    ];
  }
}
