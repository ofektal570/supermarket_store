import { Router, Request, Response } from "express";

const { products } = require("../../models/");

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const productsArr = await products.findAll();

    return res.json(productsArr);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/unique_id", async (req: Request, res: Response) => {
  try {
    products
      .findAll({
        limit: 1,
        where: {},
        order: [["createdAt", "DESC"]],
      })
      .then(function (entries: { dataValues: { id: number } }[]) {
        let id = 0;

        if (entries[0] != null) {
          id = entries[0].dataValues.id;
        }

        return res.json(id + 1);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/", async (req: Request, res: Response) => {
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

router.delete("/:product_id", async (req: Request, res) => {
  const { product_id } = req.params;
  try {
    const productToDestroy = await products.findOne({ where: { product_id } });

    console.log("look!!!!", product_id);
    await productToDestroy.destroy();

    return res.json({ msg: "product deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.delete("/", async (req: Request, res) => {
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

router.put("/update_price", async (req: Request, res) => {
  const { product_id, new_price } = req.body;
  try {
    const productToUpdate = await products.findOne({ where: { product_id } });
    
    console.log("PRODUCT IS", productToUpdate);
    productToUpdate.prev_price = productToUpdate.curr_price;
    productToUpdate.curr_price = parseFloat(new_price);

    await productToUpdate.save();

    return res.json(productToUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.put("/update_amount", async (req: Request, res: Response) => {
  const { product_id, new_amount } = req.body;
  try {
    const productToUpdate = await products.findOne({ where: { product_id } });

    productToUpdate.amount = new_amount;
    await productToUpdate.save();

    return res.json(productToUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;
