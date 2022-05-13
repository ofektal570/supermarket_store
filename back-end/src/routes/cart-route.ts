import { Router, Request, Response } from "express";

const { cart, products } = require("../../models/");
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let cartItems = await cart.findAll();

    if (cartItems.length == 0) {
      await cart.create({ product_id: [], qty: [], delivery_option: "take-away" });
      cartItems = await cart.findAll();
    }

    if (cartItems[0].dataValues.product_id !== null) {
      const proudctsId = cartItems[0].dataValues.product_id;
      let productsArr = [];
      for (let i = 0; i < proudctsId.length; i++) {
        const product_id = proudctsId[i];
        const product = await products.findOne({ where: { product_id } });
        productsArr.push(product);
      }
      return res.json({
        id: cartItems[0].id,
        productsArr,
        qty: cartItems[0].dataValues.qty,
        delivery_option: cartItems[0].dataValues.delivery_option,
      });
    }

    return res.json(cartItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.post("/", async (req, res) => {
  const { product_id, qty } = req.body;
  try {
    let cartDetails = await cart.findOne({ where: { id: 1 } });

    if (!cartDetails.product_id.includes(product_id)) {
      cartDetails.qty = cartDetails.qty.concat([qty]);
      cartDetails.product_id = cartDetails.product_id.concat([product_id]);

      await cartDetails.save();
    } else {
      console.log("I SAVED YOU!!!!");
    }

    return res.json(cartDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const { product_id, qty } = req.body;
  try {
    let cartDetails = await cart.findOne({ where: { id: 1 } });

    cartDetails.product_id = product_id;
    cartDetails.qty = qty;

    await cartDetails.save();

    return res.json(cartDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.put("/update_qty", async (req: Request, res: Response) => {
  const { product_id, qty } = req.body;
  try {
    let cartDetails = await cart.findOne({ where: { id: 1 } });
    let productIdx = cartDetails.product_id.indexOf(parseInt(product_id));
    let tempQty = [...cartDetails.qty];

    tempQty[productIdx] = qty;
    cartDetails.qty = tempQty.concat([]);

    await cartDetails.save();

    return res.json(cartDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.put("/update_delivery", async (req, res) => {
  const { delivery_option } = req.body;
  try {
    let cartDetails = await cart.findOne({ where: { id: 1 } });

    cartDetails.delivery_option = delivery_option;

    await cartDetails.save();

    return res.json(cartDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.delete("/:product_id", async (req: Request, res: Response) => {
  const { product_id } = req.params;
  try {
    let cartDetails = await cart.findOne({ where: { id: 1 } });
    let tempQtyArr = [...cartDetails.qty];
    let tempIdArr = [...cartDetails.product_id];
    let productIdx = cartDetails.product_id.indexOf(parseInt(product_id));

    tempQtyArr.splice(productIdx, 1);
    tempIdArr.splice(productIdx, 1);

    cartDetails.qty = tempQtyArr.concat([]);
    cartDetails.product_id = tempIdArr.concat([]);
    await cartDetails.save();

    return res.json({ msg: "product removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.delete("/", async (req, res) => {
  try {
    let cartDetails = await cart.findOne({ where: { id: 1 } });
    cartDetails.product_id = [];
    cartDetails.qty = [];
    cartDetails.delivery_option = "take-away";

    await cartDetails.save();

    return res.json({ msg: "cart empty" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
