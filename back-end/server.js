const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
const adminsRoute = require("./routes/admins-route");
const productsRoute = require("./routes/products-route");
const cartRoute = require("./routes/cart-route");
const pricesRoute = require("./routes/prices-route");
const ordersRoute = require("./routes/orders-route");

const app = express();
let port = 3000;

app.use(morgan("dev"));
app.use(express.json());

// Prevent Cors
app.use((req, res, next) => {
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

// Uploading a server + connect to DB
app.listen({ port }, async () => {
  console.log("Server Listening to port ", port);
  try {
    await sequelize.authenticate();
    console.log("DB connected!");
  } catch (err) {
    console.log("Unable to coonect to the DB");
  }
});
