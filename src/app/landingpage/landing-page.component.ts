
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

interface Item {
  item_ID: number;
  item_name: string;
  item_description: string;
  item_price: number;
  category_id: number;
  stock: number;
  employee_id: number;
  best_before: string;
  images: Image[];
}

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

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    this.getItems();
    this.autoChangeImages();
  }


  getItems(): void {
    this.http.get<Item[]>('items').subscribe(data => {
      this.items = data;
      this.getRandomImages();
    });
  }

  getRandomImages(): void {
    const allImages: Image[] = [];

    this.items.forEach(item => {
      allImages.push(...item.images);
    });

    const shuffledImages = allImages.sort(() => 0.5 - Math.random());
    this.randomImages = shuffledImages.slice(0, 4);
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
}
  
  
  
  
 




