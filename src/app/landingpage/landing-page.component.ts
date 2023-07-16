
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
//import { first } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import {Item} from '../shared/item';


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

  activeImageIndex = 0;

  items: Item[] = [];
  randomItems: Item[] = [];

  randomImages: Image[] = [];

  autoChangeInterval: any;
  isLoggedIn: boolean = false;

  selectedCategoryItems: Item[] = [];

  selectedCategory : string; 

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getItems();
    this.autoChangeImages();
    this.selectedCategory = "No filter";    
  }


  itemsURL = "http://localhost:8080/landing"
  getItems(): void {
    this.http.get<Item[]>(this.itemsURL).subscribe(data => {
      this.items = data; 
      console.log(this.items);

      // Get random items from the list
      this.randomItems = this.getRandomItems(3);

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








