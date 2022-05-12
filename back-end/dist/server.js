"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("./socket-io");
const morgan = require("morgan");
const { sequelize } = require("../models/");
const adminsRoute = require("./routes/admins-route");
const productsRoute = require("./routes/products-route");
const cartRoute = require("./routes/cart-route");
const pricesRoute = require("./routes/prices-route");
const ordersRoute = require("./routes/orders-route");
const socketRoute = require("./routes/socket-io-route");
// const socketIoObject = require("./socket-io");
const socketio = require("socket.io");
const app = (0, express_1.default)();
let port = 3000;
app.use(morgan("dev"));
app.use(express_1.default.json());
// Prevent Cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
// Routes
app.use("/admins", adminsRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/prices", pricesRoute);
app.use("/orders", ordersRoute);
app.use("/socket-io", socketRoute);
// Uploading a server + connect to DB
const server = app.listen({ port }, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server Listening to port ", port);
    try {
        yield sequelize.authenticate();
        console.log("DB connected!");
    }
    catch (err) {
        console.log("Unable to coonect to the DB");
    }
}));
// Socket-io
const io = socketio(server, {
    serveClient: true,
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", function (socket) {
    console.log("Made socket connection");
    socket_io_1.SocketIo.ListenUpdatePrice().on("start", () => {
        console.log("PRICE UPDATED");
        socket.emit("update-price-stream", "Please Load Your Products, Price Changed");
    });
});
