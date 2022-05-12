// const { Router } = require("express");
import { Router } from "express";
import { SocketIo } from "../socket-io";

const { products, price } = require("../../models/");


const router = Router();

router.put("/update_price", async (req, res) => {
  const { product_id, new_price } = req.body;
  try {
    // update product and emit event
    const productToUpdate = await products.findOne({ where: { product_id } });

    productToUpdate.prev_price = productToUpdate.curr_price;
    productToUpdate.curr_price = parseFloat(new_price);

    await productToUpdate.save();

    SocketIo.emitUpdatePrice();

    // update price tracking
    const prev_price = productToUpdate.prev_price;
    const curr_price = productToUpdate.curr_price;
    let productTracked = await price.findOne({ where: { product_id } });

    if (productTracked === null) {
      let prices = [prev_price, curr_price];
      let dates = [new Date()];

      productTracked = await price.create({ product_id, prices, dates });
    } else {
      let prices = [...productTracked.prices];
      prices.push(curr_price);
      productTracked.prices = prices;

      let dates = [...productTracked.dates];
      dates.push(new Date());
      productTracked.dates = dates;

      await productTracked.save();
    }
    
    return res.json(productToUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
