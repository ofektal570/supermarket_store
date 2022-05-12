"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIo = void 0;
const EventEmitter = require("events");
// const SocketIoObject = new SocketIo();
class SocketIo {
    constructor() { }
    static emitUpdatePrice() {
        console.log("YEAHHHHHH");
        this.eventEmitter.emit("start");
    }
    static ListenUpdatePrice() {
        return this.eventEmitter;
    }
}
exports.SocketIo = SocketIo;
SocketIo.eventEmitter = new EventEmitter();
;
