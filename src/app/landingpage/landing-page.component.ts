import { Component, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';

declare var $: any;

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        (jQuery('.carousel') as any).carousel();
    }
}