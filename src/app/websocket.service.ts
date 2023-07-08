import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Stomp from 'webstomp-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private webSocket: WebSocket;
  private stompClient: Stomp.Client;

  constructor() { }

  public connect(): Observable<Stomp.Frame> {
    this.webSocket = new WebSocket('ws://localhost:8080/ws'); // Die Url ersetzen entsprechend unserer WebSocket-Endpunkt-URL

    this.stompClient = Stomp.over(this.webSocket);
    return new Observable<Stomp.Frame>(observer => {
      this.stompClient.connect({}, (frame: Stomp.Frame) => {
        observer.next(frame);
      });
    });
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
