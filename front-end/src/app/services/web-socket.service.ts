import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { io } from "socket.io-client";
import { SocketUrl} from "../config/api"
@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  socket: any;
  readonly uri: string = SocketUrl;

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string) {
    return new Observable((subscriber: { next: (arg0: any) => void }) => {
      this.socket.on(eventName, (data: any): void => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
