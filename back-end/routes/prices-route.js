const { Router } = require("express");
const { price, products } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pricesArr = await price.findAll();

    let productsName = [];
    for (let item of pricesArr) {
      const product_id = item.product_id;
      const product = await products.findOne({ where: { product_id } });
      if (product) {
        productsName.push(product.name);
      }
    }

    return res.json({
      names: productsName,
      prices: pricesArr,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.post("/", async (req, res) => {
  const { product_id, prev_price, curr_price } = req.body;
  try {
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

    return res.json(productTracked);
  } catch (err) {
    console.log(err);
    return res.json({ error: "something went wrong!!" });
  }
});

router.delete("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const productTracked = await price.findOne({ where: { product_id } });
    if (productTracked != null) {
      await productTracked.destroy();
    }

    return res.json("deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.delete("/", async (req, res) => {
  try {
    price.destroy({
      where: {},
      truncate: true,
    });

    return res.json("cleard");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

module.exports = router;
