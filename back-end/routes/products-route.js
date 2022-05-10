const { Router } = require("express");
const { products } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productsArr = await products.findAll();
    return res.json(productsArr);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/", async (req, res) => {
  const { name, prev_price, curr_price, amount, image_url, product_id } = req.body;
  try {
    const productsArr = await products.create({
      product_id,
      name,
      prev_price,
      curr_price,
      amount,
      image_url,
    });

    return res.json(productsArr);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const productToDestroy = await products.findOne({ where: { product_id } });
    
    console.log('look!!!!' ,product_id);
    await productToDestroy.destroy();

    return res.json({ msg: "product deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.delete("/", async (req, res) => {
  try {
    products.destroy({
      where: {},
      truncate: true,
    });

    return res.json({ msg: "clear" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});


router.put("/", async (req, res) => {
  try {
    const { product_id, new_price } = req.body;
    const productToUpdate = await products.findOne({ where: { product_id } });
    
    productToUpdate.prev_price = productToUpdate.curr_price;
    productToUpdate.curr_price = parseInt(new_price);
    
    await productToUpdate.save();

    return res.json(productToUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
