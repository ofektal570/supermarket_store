const { Router } = require("express");
const { cart, products } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cartItems = await cart.findAll();
    if (cartItems[0].dataValues.product_id === null){
      console.log('cart empty');
    }else{
      const proudctsId = cartItems[0].dataValues.product_id;
      let productsArr = [];
      for (let i = 0; i < proudctsId.length; i++) {
        const product_id = proudctsId[i];
        const product = await products.findOne({ where: { product_id } });
        productsArr.push(product);
      }
      return res.json({
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
  const { product_id, qty, delivery_option } = req.body;
  try {
    // const cartItems = await cart.create({ product_id, qty, delivery_option });
    // const cartItems = await cart.create({ product_id:null, qty:null, delivery_option:null });
    
    return res.status(404).json({msg:'You cant create new Cart!'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.put("/", async (req, res) => {
  const { product_id, qty, delivery_option } = req.body;
  try {
    let cartDetails = await cart.findOne({ where: {id:1} });
    
    cartDetails.product_id = product_id;
    cartDetails.qty = qty;
    cartDetails.delivery_option = delivery_option;
    
    await cartDetails.save();
    
    return res.json(cartDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});
module.exports = router;

// router.delete("/", async (req, res) => {
//   try {
//     // cart.destroy({
//     //   where: {},
//     //   truncate: true,
//     // });
//     // cart.sync({ force: true });
    
//     //  let cartDetails = await cart.findOne({ where: {} });
//     //  cartDetails.product_id = [];
//     //  cartDetails.qty = [];
//     //  cartDetails.delivery_option = 'take-away';

//     //  await cartDetails.save();

//     return res.json({ msg: "cart empty" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "something went wrong" });
//   }
// });

// router.delete("/:product_id", async (req, res) => {
//   const { product_id } = req.params;
  
//   try {
//     const productToReturn = await cart.findOne({ where: { product_id } });

//     await productToReturn.destroy();

//     return res.json({ msg: "product returned!" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "something went wrong" });
//   }
// });

// router.put("/:product_id", async (req, res) => {
//   const { product_id, qty, delivery_option } = req.body;
//   try {
//     const productsArr = await cart.findOne({ where: { product_id } });
    
//     cartItem.qty = qty;
//     cartItem.delivery_option = delivery_option;

//     await cartItem.save();

//     return res.json(cartItem);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "something went wrong" });
//   }
// });

