const EventEmitter = require("events");

class SocketIo {
  eventEmitter = new EventEmitter();

  x = 5;

  constructor() {}
  
  emitUpdatePrice() {
    console.log("YEAHHHHHH");
    this.eventEmitter.emit("start");
  }

  ListenUpdatePrice() {
    return this.eventEmitter;
  }
}

SocketIoObject = new SocketIo();

module.exports = SocketIoObject;
