import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private webSocket: WebSocket;

  public connect(): Observable<any> {
    this.webSocket = new WebSocket('ws://localhost:8080/'); 
    
    return new Observable<any>(observer => {
      this.webSocket.onopen = (event: Event) => {
        observer.next(event);
      };

      this.webSocket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        observer.next(data);
      };

      this.webSocket.onerror = (event: Event) => {
        observer.error(event);
      };

      this.webSocket.onclose = (event: CloseEvent) => {
        observer.complete();
      };
    });
  }
  
  public disconnect() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }

  public subscribeToItemChanges(): Observable<any> {
    return new Observable<any>(observer => {
      this.webSocket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.event === 'itemListChange') {
          observer.next(data);
        }
      };
    });
  }
}

