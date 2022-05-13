import { Router, Request, Response } from "express";

const { order } = require("../../models/");
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  let ordersArr = await order.findAll();

  return res.json({ ordersArr });
});

router.post("/", async (req: Request, res: Response) => {
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

router.delete("/:id", async (req: Request, res: Response) => {
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

router.delete("/", async (req: Request, res: Response) => {
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
