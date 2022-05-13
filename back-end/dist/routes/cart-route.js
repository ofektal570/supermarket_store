"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { Router } = require("express");
const express_1 = require("express");
const { cart, products } = require("../../models/");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cartItems = yield cart.findAll();
        if (cartItems.length == 0) {
            yield cart.create({ product_id: [], qty: [], delivery_option: "take-away" });
            cartItems = yield cart.findAll();
        }
        if (cartItems[0].dataValues.product_id !== null) {
            const proudctsId = cartItems[0].dataValues.product_id;
            let productsArr = [];
            for (let i = 0; i < proudctsId.length; i++) {
                const product_id = proudctsId[i];
                const product = yield products.findOne({ where: { product_id } });
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
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong!!" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, qty } = req.body;
    try {
        let cartDetails = yield cart.findOne({ where: { id: 1 } });
        if (!cartDetails.product_id.includes(product_id)) {
            cartDetails.qty = cartDetails.qty.concat([qty]);
            cartDetails.product_id = cartDetails.product_id.concat([product_id]);
            yield cartDetails.save();
        }
        else {
            console.log("I SAVED YOU!!!!");
        }
        return res.json(cartDetails);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, qty } = req.body;
    try {
        let cartDetails = yield cart.findOne({ where: { id: 1 } });
        cartDetails.product_id = product_id;
        cartDetails.qty = qty;
        yield cartDetails.save();
        return res.json(cartDetails);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.put("/update_qty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, qty } = req.body;
    try {
        let cartDetails = yield cart.findOne({ where: { id: 1 } });
        let productIdx = cartDetails.product_id.indexOf(parseInt(product_id));
        let tempQty = [...cartDetails.qty];
        tempQty[productIdx] = qty;
        cartDetails.qty = tempQty.concat([]);
        yield cartDetails.save();
        return res.json(cartDetails);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.put("/update_delivery", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { delivery_option } = req.body;
    try {
        let cartDetails = yield cart.findOne({ where: { id: 1 } });
        cartDetails.delivery_option = delivery_option;
        yield cartDetails.save();
        return res.json(cartDetails);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.delete("/:product_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        let cartDetails = yield cart.findOne({ where: { id: 1 } });
        let tempQtyArr = [...cartDetails.qty];
        let tempIdArr = [...cartDetails.product_id];
        let productIdx = cartDetails.product_id.indexOf(parseInt(product_id));
        tempQtyArr.splice(productIdx, 1);
        tempIdArr.splice(productIdx, 1);
        cartDetails.qty = tempQtyArr.concat([]);
        cartDetails.product_id = tempIdArr.concat([]);
        yield cartDetails.save();
        return res.json({ msg: "product removed" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cartDetails = yield cart.findOne({ where: { id: 1 } });
        cartDetails.product_id = [];
        cartDetails.qty = [];
        cartDetails.delivery_option = "take-away";
        yield cartDetails.save();
        return res.json({ msg: "cart empty" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
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
