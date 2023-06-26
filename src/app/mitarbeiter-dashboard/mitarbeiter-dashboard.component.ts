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
      {id: 1, name: '2X2Re Stone', description: 'Mystery stone, veery precious', price: 50000, bestBeforeDate: '02.01.2320', quantity: 3, picture: 'space_stone.jpeg', categories: ['Other','Art']},
      {id: 2, name: 'X-Wing', description: 'Relic from past times...', price: 67658, bestBeforeDate: '-', quantity: 30, picture: 'x_wing.jpeg', categories: ['Equipment', 'Other']},
      {id: 3, name: 'Spacetronics Starsuit', description: 'Very comfortable!', price: 200000, bestBeforeDate: '-', quantity: 11, picture: 'spacesuite.jpg', categories: ['Equipment', 'Fashion']},
      {id: 4, name: 'VirtuCare Pets - CatBot Edition', description: 'The perfect companion', price: 99.99, bestBeforeDate: '-', quantity: 30, picture: 'virtualpet_cat.jpg', categories: ['Art', 'Toys', 'Other']},
      {id: 5, name: 'MediReady NanoBots', description: 'Works 100%', price:  5000.99, bestBeforeDate: '01.10.2300', quantity: 30, picture: 'healing_nanobots.jpg', categories: ['Health']}
    ];
  }
}
