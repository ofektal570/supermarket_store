import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { SocketUrl } from "../config/api";
@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket: Socket;
  readonly uri: string = SocketUrl;

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<{ next: (arg0: any) => void }> {
    return new Observable((subscriber: { next: (arg0: any) => void }) => {
      this.socket.on(eventName, (data: any): void => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
