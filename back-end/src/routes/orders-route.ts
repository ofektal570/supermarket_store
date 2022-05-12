// const { Router } = require("express");
import { Router } from "express";

const { order, products } = require("../../models/");

const router = Router();

router.get("/", async (req, res) => {
  let ordersArr = await order.findAll();

  return res.json({ ordersArr });
});

router.post("/", async (req, res) => {
  const { product_name, qty, total_price, delivery_option } = req.body;
  try {
    const orderSummary = await order.create({
      product_name,
      qty,
      total_price,
      delivery_option,
    });

    return res.json(orderSummary);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const orderSummary = await order.findOne({ where: { id } });

    await orderSummary.destroy();

    return res.json(orderSummary);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.delete("/", async function (req, res) {
  try {
    order.destroy({
      where: {},
      truncate: true,
    });
    return res.json({ msg: "clear" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
