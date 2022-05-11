const { Router } = require("express");
const { price, products } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pricesArr = await price.findAll();
    let productsName = [];    
    // console.log(pricesArr);
    for(let item of pricesArr) {
      const product_id = item.product_id;
      const product = await products.findOne({ where: { product_id } });
      productsName.push(product.name);
    }
    
    // pricesArr[names] = productsName;
    return res.json({
      names: productsName,
      prices : pricesArr
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.post("/", async (req, res) => {
  try{
    const {product_id, prev_price, curr_price} = req.body;
    
    let productTracked = await price.findOne({ where: { product_id } });
    
    if (productTracked === null){
      let prices = [prev_price, curr_price];
      let dates = [new Date()];
      
      productTracked = await price.create({ product_id, prices, dates });
    }else{
      // productTracked.prices.push(curr_price);
      let prices = [...productTracked.prices];
      prices.push(curr_price);
      productTracked.prices= prices;
      
      let dates = [...productTracked.dates];
      dates.push(new Date());
      productTracked.dates = dates;
      
      // productTracked.dates.push(new Date());
      await productTracked.save();     
    }
    
    return res.json(productTracked);
  }catch (err){
    console.log(err);
    return res.json({ error: "something went wrong!!" });  
  }
});

router.delete("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const productTracked = await price.findOne({ where: {product_id}});
    
    await productTracked.destroy();
    
    return res.json('deleted');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

router.delete('/', async (req, res) => {
  try {
     price.destroy({
       where: {},
       truncate: true,
     });
    
    return res.json('cleard');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong!!" });
  }
});

module.exports = router;
