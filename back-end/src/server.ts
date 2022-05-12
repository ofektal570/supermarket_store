import express, { Request, Response, NextFunction } from "express";
import  {SocketIo}  from "./socket-io";

const morgan = require("morgan");

const { sequelize } = require("../models/");
const adminsRoute = require("./routes/admins-route");
const productsRoute = require("./routes/products-route");
const cartRoute = require("./routes/cart-route");
const pricesRoute = require("./routes/prices-route");
const ordersRoute = require("./routes/orders-route");
const socketRoute = require("./routes/socket-io-route");
const socketio = require("socket.io");

const app = express();
let port = 3000;

app.use(morgan("dev"));
app.use(express.json());

// Prevent Cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
const server = app.listen({ port }, async () => {
  console.log("Server Listening to port ", port);
  try {
    await sequelize.authenticate();
    console.log("DB connected!");
  } catch (err) {
    console.log("Unable to coonect to the DB");
  }
});

// Socket-io
const io = socketio(server, {
  serveClient: true,
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", function (socket: { emit: (arg0: string, arg1: string) => void; }) {
  console.log("Made socket connection");
  SocketIo.ListenUpdatePrice().on("start", () => {
    console.log("PRICE UPDATED");
    socket.emit("update-price-stream", "Please Load Your Products, Price Changed");
  });
});




