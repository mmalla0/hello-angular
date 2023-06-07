import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  title ="Matrix";
  constructor(private http: HttpClient){
     this. getEvent();

  }
  url = "event"
  getEvent(): void
  {
    this.http.get(this.url).subscribe((data) => {
      this.title = JSON.stringify(data);
    });
  }
}