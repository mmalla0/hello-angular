
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
//import { first } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import {Item} from '../shared/item'


/*interface Item {
  item_ID: number;
  item_name: string;
  item_description: string;
  item_price: number;
  stock: number;
  employee_id: number;
  best_before: string;
  item_imgpath: string;
  categories: string[];
} */

interface Image {
  imgitemID: number;
  img_url: string;
  imgAlt: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('imageState', [
      state('active', style({
        transform: 'scale(1.2)',
        zIndex: 1
      })),
      state('inactive', style({
        transform: 'scale(1)',
        zIndex: 0
      })),
      //transition('inactive => active', animate('500ms ease-in')),
      //transition('active => inactive', animate('500ms ease-out'))
      transition('inactive <=> active', animate('2s ease-in-out'))
    ])
  ]
})

export class LandingPageComponent implements OnInit {


  /*images: string[] = [
    '../assets/images/spacesuite.jpg',
    '../assets/images/virtualpet_cat.jpg',
    '../assets/images/alien_painting.jpg',
    '../assets/images/healing_nanobots.jpg'
  ];
  activeImageIndex = 0;
  products: Item[] = [
    { item_name: 'Spacetronics Starsuit', price: 200000.99, link: '/items/1' },
    { item_name: 'VirtuCare Pets - CatBot Edition', price: 99.99, link: '/items/2' },
    { item_name: 'Floatescending - Art by Ydra', price: 300.99, link: '/items/3' },
    { item_name: 'MediReady NanoBots', price: 50.99, link: '/items/4' }
  ]; */

  activeImageIndex = 0;

  items: Item[] = [];
  randomImages: Image[] = [];

  autoChangeInterval: any;
  isLoggedIn: boolean = false;

  selectedCategoryItems: Item[] = [];

  selectedCategory : string; 

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getItems();
    this.autoChangeImages();
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    })
    this.selectedCategory = "No filter";
    //this.selectedCategoryItems = this.getRandomItems(3);
  }


  itemsURL = "landing"
  getItems(): void {
    this.http.get<Item[]>(this.itemsURL).subscribe(data => {
      this.items = data;

      console.log(this.items);

      // Get random items from the list
      const randomItems = this.getRandomItems(3);

      // Assign random items to the component property
      this.items = randomItems;
    });
  }

  getRandomItems(count: number): Item[] {
    const randomItems: Item[] = [];
    const maxIndex = this.items.length - 1;

    for (let i = 0; i < count; i++) {
      // Get a random index
      const randomIndex = Math.floor(Math.random() * maxIndex);

      // Push the item at the random index into the array
      randomItems.push(this.items[randomIndex]);
    }

    return randomItems;
  }

  handleLoginClicked() {
    this.router.navigate(['/login'])
  }

  handleRegisterClicked() {
    this.router.navigate(['/register'])
  }

  handleLogoutClicked() {
    this.authService.logout()
  }

  autoChangeImages() {
    this.autoChangeInterval = setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  setActiveImage(index: number) {
    clearInterval(this.autoChangeInterval);
    this.activeImageIndex = index;
  }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.randomImages.length;
  }

  getProductInfo(): Item {
    return this.items[this.activeImageIndex];

  }

  getImageState(index: number) {
    return index === this.activeImageIndex ? 'active' : 'inactive';
  }

  changeCategory(category: string) {
    this.selectedCategory = category; 
    const categoryItems = this.items.filter(item => item.categories.includes(category));
    this.selectedCategoryItems = categoryItems.slice(0, 3);
  }

  handleCategoryImageClick(){
    const navigationExtras: NavigationExtras = {
      queryParams: { extraParam: this.selectedCategory }
    };
    this.router.navigate(['/warenübersicht'], navigationExtras);
  }
}








