const EventEmitter = require("events");

export class SocketIo {
  private static eventEmitter = new EventEmitter();

  constructor() {}

  static emitUpdatePrice() {
    console.log("YEAHHHHHH");
    this.eventEmitter.emit("start");
  }

  static ListenUpdatePrice() {
    return this.eventEmitter;
  }
};

