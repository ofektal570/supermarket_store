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
const { products } = require("../../models/");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsArr = yield products.findAll();
        return res.json(productsArr);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.get("/unique_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        products
            .findAll({
            limit: 1,
            where: {},
            order: [["createdAt", "DESC"]],
        })
            .then(function (entries) {
            let id = 0;
            if (entries[0] != null) {
                id = entries[0].dataValues.id;
            }
            return res.json(id + 1);
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, prev_price, curr_price, amount, image_url, product_id } = req.body;
    try {
        const productsArr = yield products.create({
            product_id,
            name,
            prev_price,
            curr_price,
            amount,
            image_url,
        });
        return res.json(productsArr);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}));
router.delete("/:product_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const productToDestroy = yield products.findOne({ where: { product_id } });
        console.log("look!!!!", product_id);
        yield productToDestroy.destroy();
        return res.json({ msg: "product deleted!" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        products.destroy({
            where: {},
            truncate: true,
        });
        return res.json({ msg: "clear" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.put("/update_price", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, new_price } = req.body;
    try {
        const productToUpdate = yield products.findOne({ where: { product_id } });
        productToUpdate.prev_price = productToUpdate.curr_price;
        productToUpdate.curr_price = parseFloat(new_price);
        yield productToUpdate.save();
        return res.json(productToUpdate);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.put("/update_amount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, new_amount } = req.body;
    try {
        const productToUpdate = yield products.findOne({ where: { product_id } });
        productToUpdate.amount = new_amount;
        yield productToUpdate.save();
        return res.json(productToUpdate);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
module.exports = router;
