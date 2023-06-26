
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
//import { first } from 'rxjs';
import { Router } from '@angular/router';

interface Item {
  name: string;
  price: number;
  link: string;
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
  images: string[] = [
    '../assets/images/spacesuite.jpg',
    '../assets/images/virtualpet_cat.jpg',
    '../assets/images/alien_painting.jpg',
    '../assets/images/healing_nanobots.jpg'
  ];
  activeImageIndex = 0;
  products: Item[] = [
    { name: 'Spacetronics Starsuit', price: 20000000.99, link: '/items/1' },
    { name: 'VirtuCare Pets - CatBot Edition', price: 99.99, link: '/items/2' },
    { name: 'Floatescending - Art by Ydra', price: 300.99, link: '/items/3' },
    { name: 'MediReady NanoBots', price: 50.99, link: '/items/4' }
  ];

  autoChangeInterval: any;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { 
    this.autoChangeImages();
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
        this.isLoggedIn= loggedIn;
    })
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
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }

  getProductInfo(): Item {
    return this.products[this.activeImageIndex];
  }

  getImageState(index: number) {
    return index === this.activeImageIndex ? 'active' : 'inactive';
  }
}
  
  
  
  
 




