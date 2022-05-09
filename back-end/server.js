const express = require("express");
const { sequelize } = require("./models");
const adminsRoute = require("./routes/admins-route");
const productsRoute = require("./routes/products-route");

const app = express();
let port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/admins', adminsRoute);
app.use("/products", productsRoute);

//common
app.listen({ port }, async () => {
  console.log("Server Listening to port ", port);
  try {
    await sequelize.authenticate();
    console.log("DB connected!");
  } catch (err) {
    console.log("Unable to coonect to the DB");
  }
});

// app.get("/admins", async (req, res) => {
//   try {
//     const admins = await Admins.findAll();
//     return res.json(admins);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "something went wrong" });
//   }
// });

// app.post("/admins", async (req, res) => {
//   try {
//     const {email, password} = req.body;

//     const admins = await Admins.create({ email, password });

//     return res.json(admins);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "something went wrong" });
//   }
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });
