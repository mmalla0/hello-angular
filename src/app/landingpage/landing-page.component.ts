
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
//import { first } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import {Item} from '../shared/item';
import * as d3 from 'd3';


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
    //this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      //this.isLoggedIn = loggedIn;
    //})
    this.selectedCategory = "No filter";
    //this.selectedCategoryItems = this.getRandomItems(3);
    this.renderVisualNetwork();
    
  }


  itemsURL = "http://localhost:8080/landing"
  getItems(): void {
    this.http.get<Item[]>(this.itemsURL).subscribe(data => {
      this.items = data; 
      console.log(this.items);

      // Get random items from the list
      this.randomItems = this.getRandomItems(3);

      // Assign random items to the component property
      // this.items = randomItems;
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

 /* handleLoginClicked() {
    this.router.navigate(['/login'])
  }

  handleRegisterClicked() {
    this.router.navigate(['/register'])
  }

  handleLogoutClicked() {
    this.authService.logout()
  } */

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



  renderVisualNetwork(): void {
    const networkContainer = d3.select('body')
      .append('svg')
      .attr('width', 800)
      .attr('height', 200);

    // Example D3.js network code
    const nodes = [
      { id: 'node1', label: 'Node 1' },
      { id: 'node2', label: 'Node 2' },
      { id: 'node3', label: 'Node 3' },
    ];

    const edges = [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node1' },
    ];

    const nodeElements = networkContainer
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .attr('fill', 'blue')
      .attr('cx', (d, i) => (i + 1) * 100)
      .attr('cy', 100);

    const edgeElements = networkContainer
      .selectAll('.edge')
      .data(edges)
      .enter()
      .append('line')
      .attr('class', 'edge')
      .attr('stroke', 'gray')
      .attr('x1', (d) => {
        const sourceNode = nodes.find((node) => node.id === d.source);
        return networkContainer.select(`.node#${sourceNode.id}`).attr('cx');
      })
      .attr('y1', (d) => {
        const sourceNode = nodes.find((node) => node.id === d.source);
        return networkContainer.select(`.node#${sourceNode.id}`).attr('cy');
      })
      .attr('x2', (d) => {
        const targetNode = nodes.find((node) => node.id === d.target);
        return networkContainer.select(`.node#${targetNode.id}`).attr('cx');
      })
      .attr('y2', (d) => {
        const targetNode = nodes.find((node) => node.id === d.target);
        return networkContainer.select(`.node#${targetNode.id}`).attr('cy');
      });
  }

}








